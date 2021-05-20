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
d3.csv("data.csv").then(function(err, ourdata) {
    if (err) throw err;
console.log(ourdata)

    // parse data
    ourdata.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });
  
    // xLinearScale function above csv import
    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);
      
  
    // Create initial axis functions
    var xaxis = d3.axisx(xLinearScale);
    var yaxis = d3.axisy(yLinearScale);

    var xaxismin;
    var xaxismax;
    var yaxismin;
    var yaxismax;
    
    xaxismin = d3.min(ourdata, function(data) {
return data.healthcare;
    });
    
    xaxismax = d3.max(ourdata, function(data) {
        return data.healthcare;
    });
    
    yaxismin = d3.min(ourdata, function(data) {
        return data.poverty;
    });
    
    yaxismax = d3.max(ourdata, function(data) {
        return data.poverty;
    });
    
    xLinearScale.domain([xaxismin, xaxismax]);
    yLinearScale.domain([yaxismin, yaxismax]);
    console.log(xaxismin);
    console.log(yaxismax);


