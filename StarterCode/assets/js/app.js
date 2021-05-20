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
    .select("#scatter")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv", function(usedata) {

    // parse data
    usedata.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

        // xLinearScale function above csv import
    var xLinearScale = d3
    .scaleLinear()
    .domain([d3.extent(usedata)])
    .range([margin + labelArea, width - margin]);
    
    var yLinearScale = d3
    .scaleLinear()
    .domain(])
    .range([height - margin - labelArea, margin]);
      
        // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    

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

    // CREATE CIRCLES

    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "12")
    .attr("fill", "blue")
    .attr("opacity", .5);

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