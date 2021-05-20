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
var svg = d3.select("body").append("svg")
    .attr("height", height)
    .attr("width", width);

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

