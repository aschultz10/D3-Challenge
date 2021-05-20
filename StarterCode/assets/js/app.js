// @TODO: YOUR CODE HERE!

// Create Vars for Scatter
var width = 1000
var height = 600

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

// create svg container
var svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);


// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].poverty);
        console.log(data[i].healthcare);

    // parse data
    data.forEach(d => {
      d.poverty = +d.poverty;
      d.healthcare = +d.healthcare;
    });
  
    // xLinearScale function above csv import
    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);
      
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    function xMinMax() {
        xMin = d3.min(data, function(d) {
          return parseFloat(d[curX]) * 0.90;});
        xMax = d3.max(data, function(d) {
          return parseFloat(d[curX]) * 1.10;});
    }
    function yMinMax() {
        yMin = d3.min(data, function(d) {
          return parseFloat(d[curY]) * 0.90; });
        yMax = d3.max(data, function(d) {
          return parseFloat(d[curY]) * 1.10;
        });
    }
    
    xLinearScale.domain([xMinMax]);
    yLinearScale.domain([yMinMax]);
    console.log(xMin);
    console.log(yMax);

    // Append axes
    chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup
    .append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(data).enter().append("circle")
    .attr("cx", d => xLinearScale(d.healthcare +1.5))
    .attr("cy", d => yLinearScale(d.poverty +0.3))
    .attr("r", "12")
    .attr("fill", "blue")
    .attr("opacity", .5)
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    // Make the tooltip
    var toolTip = d3.tip().attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (abbr + '%');
      });
    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
        toolTip.show(data);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
    // axes labels
    chartGroup.append("text")
    .style("font-size", "12px")
    .selectAll("tspan")
    .data(data)
    .enter()
    .append("tspan")
        .attr("x", function(data) {
            return xLinearScale(d.healthcare +1.3);
        })
        .attr("y", function(data) {
            return yLinearScale(d.poverty +.1);
        })
        .text(function(data) {
            return data.abbr
        });

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healtcare(%)");

    chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
}});
