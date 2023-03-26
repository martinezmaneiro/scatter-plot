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

//draws canvas with the dimensions set above
let drawCanvas =()=> {
    svg.attr('width', width)
    svg.attr('height', height)
};

//reference to the position of values in x and y graph
let xScale;
let yScale;

//fetching JSON data
req.open('GET', url, true);
req.onload =()=> {
    values = JSON.parse(req.responseText)
    drawCanvas();
}
req.send()



