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
    .attr("width", width);

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

      // Add X axis
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(usedata, d => d.poverty))
        .range([0, width])
    chartGroup.append("g")
        .attr("transform", "translate(0," + height/1.5 + ")")
        .call(d3.axisBottom(xLinearScale));

    // Add Y axis
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(usedata, d => d.healthcare)])
        .range([height/1.5, 0]);
    chartGroup.append("g")
        .call(d3.axisLeft(yLinearScale));
    
    
    
        // xLinearScale function above csv import
    // var xLinearScale = d3.scaleLinear()
    //     .domain(d3.extent(usedata, d => d.poverty))
    //     .range([0, width]);

    // var yLinearScale = d3.scaleLinear()
    //     .domain([0, d3.max(usedata, d => d.healthcare)])
    //     .range([height, 0]);
      
    //   // create axes
    // var xAxis = d3.axisBottom(xLinearScale);
    // var yAxis = d3.axisLeft(yLinearScale);
    
    // // Append axes
    // chartGroup.append("g")
    // .attr("transform", `translate(0, ${height})`)
    // .call(xAxis);

    // chartGroup.append("g")
    // .call(yAxis);
    
    
    // Create Scatter
    // CREATE CIRCLES

    var circlesGroup = chartGroup.selectAll("circle")
      .data(usedata)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "8")
      .attr("fill", "lightblue")
      
    chartGroup.append("text")
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

//     // Make the tooltip
//     var toolTip = d3.tip().attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (abbr + '%');
//       });
//     chartGroup.call(toolTip);

//     circlesGroup.on("click", function(data) {
//         toolTip.show(data);
//       })
//         .on("mouseout", function(data, index) {
//           toolTip.hide(data);
//         });
//     // axes labels
//     chartGroup.append("text")
//     .style("font-size", "12px")
//     .selectAll("tspan")
//     .data(data)
//     .enter()
//     .append("tspan")
//         .attr("x", function(data) {
//             return xLinearScale(d.healthcare +1.3);
//         })
//         .attr("y", function(data) {
//             return yLinearScale(d.poverty +.1);
//         })
//         .text(function(data) {
//             return data.abbr
//         });

//     chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left + 40)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .attr("class", "axisText")
//     .text("Lacks Healtcare(%)");

//     chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//     .attr("class", "axisText")
//     .text("In Poverty (%)");
// });
