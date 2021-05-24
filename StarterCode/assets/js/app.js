// @TODO: YOUR CODE HERE!

// Create Vars for Scatter
var svgWidth = 1200;
var svgHeight = 700;

const margin = {
    top: 30,
    right: 50,
    bottom: 80,
    left: 100,
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create svg container
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight + 50);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function(usedata) {

    // parse data
    usedata.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });


      // Add x scale
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(usedata, d => d.poverty))
        .range([0, width]);

    // Add y scale
    var yLinearScale = d3.scaleLinear()
        .domain([3, d3.max(usedata, d => d.healthcare)])
        .range([height, 20]);

    // Add axis & append
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    chartGroup.append("g").call(yAxis);


chartGroup.append("g")
    .selectAll('text')
    .data(usedata)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x",d=>xLinearScale(d.poverty))
    .attr("y",d=>yLinearScale(d.healthcare))
    .classed(".stateText", true)
    .attr("font-family", "")
    .attr("text-anchor", "middle")
    .attr("font-size", "9px")
    .attr("alignment-baseline", "central");

    
    // AXIS TITLES
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text("Lacks Healthcare(%)");

    chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 5))
        .attr("x", 0 - (height / 2))
        .attr("class", "axisText")
        .attr("transform", "rotate(-90)")
        .text("Poverty (%)");

    var toolTip = d3.select("#scatter")
      .append("text")
      .classed("toolTip", true);

        // Create Scatter
    var circlesGroup = chartGroup.selectAll("circle")
        .data(usedata)
        .enter()
        .append("circle")
        .attr("cx", d=>xLinearScale(d.poverty))
        .attr("cy", d=>yLinearScale(d.healthcare))
        .attr("r", "8")
        .attr("fill", "blue")
        .attr("stroke-width", "1")
        .classed("stateCircle", true)
        .attr("opacity", 0.75)
        .style("font-weight", "bold");

    // Step 2: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.style("display", "")
          .html(
            `Percentage of People Living in Poverty: ${(d.poverty)}% 
             <hr> Percentage of People Lacking Healthcare: ${d.healthcare}% </hr>
             <hr> </hr>`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })
      // Step 3: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });


}).catch(function(error) {
     console.log(error);
})
