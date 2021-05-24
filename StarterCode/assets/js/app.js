// @TODO: YOUR CODE HERE!

// Create Vars for Scatter
var width = 800
var height = 800

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
    .attr("width", width + 80);

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
        .range([0, width])

    // Add y scale
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(usedata, d => d.healthcare)])
        .range([height/1.5, 0]);

    // Add axis & append
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", "translate(0," + height/1.5 + ")").call(xAxis);
    chartGroup.append("g")
        .call(yAxis);
    
    
    // Create Scatter

    chartGroup.selectAll("circle")
        .data(usedata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "8")
        .attr("fill", "lightblue")
        .classed("stateCircle", true)

    chartGroup.selectall("g")
        .selectall('text')
        .data(usedata)
        .enter()
        .append('text')
        .attr("x",d=>xLinearScale(d.poverty))
        .attr("y",d=>yLinearScale(d.heatlhcare))
        .text(d=>d.abbr)
        .classed(".stateText", true)
    
    // AXIS TITLES
    chartGroup.append("g")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare(%)");

     chartGroup.append("g")
        .attr("transform", `translate(${width}, ${height + margin.top})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");

     // Step 1: Append tooltip div
     var toolTip = d3.select("body")
       .append("div")
       .classed("tooltip", true);

     // Step 2: Create "mouseover" event listener to display tooltip
     circlesGroup.on("mouseover", function(d) {
       toolTip.style("display", "block")
           .html(
             `<strong>${(d.poverty)}<strong><hr>${d.healthcare}`)
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
