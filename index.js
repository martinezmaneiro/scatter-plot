//these are gonna be used to fetch JSON data from the dataset into the values variable
let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();
let values = [];

//refering svg from html
let svg = d3.select('svg');

//svg dimensions
let width = 800;
let height = 600;
let padding = 40;

//reference to the position of values in x and y graph
let xScale;
let yScale;

//axes
let xAxis;
let yAxis;

//draws canvas with the dimensions set above
let drawCanvas =()=> {
    svg.attr('width', width)
    svg.attr('height', height)
};

//sets xScale and yScale to linear & time scales
let generateScales =()=> {
    xScale = d3.scaleLinear()
                .range([padding, width - padding]);
    yScale = d3.scaleTime()
                .range([padding, height - padding])
};

//draws the x and y axes in the graph
let generateAxes =()=> {
    xAxis = d3.axisBottom(xScale);
    yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height - padding) +')');

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)');
};

//fetching JSON data
req.open('GET', url, true);
req.onload =()=> {
    values = JSON.parse(req.responseText)
    drawCanvas();
    generateScales();
    generateAxes();
}
req.send()



