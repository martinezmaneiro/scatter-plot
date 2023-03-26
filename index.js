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
                .domain([d3.min(values, (item) => {
                    return  item['Year']
                }), d3.max(values, (item) => {
                    return item['Year']
                })])
                .range([padding, width - padding]);
    yScale = d3.scaleTime()
                .domain([d3.min(values, (item) => {
                    return new Date(item['Seconds'] *1000)
                }), d3.max(values, (item) => {
                    return new Date(item['Seconds']*1000)
                })])
                .range([padding, height - padding])
};

//draws the x and y axes in the graph
let generateAxes =()=> {
    xAxis = d3.axisBottom(xScale)
            //applies format to ticks to get rid of the comma
                .tickFormat(d3.format('d'));


    yAxis = d3.axisLeft(yScale)
            //applies format to ticks in form of min:sec
                .tickFormat(d3.timeFormat('%M:%S'))

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height - padding) +')');

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)');
};

//draws the circled values in the graph
let drawPoint =()=> {
    svg.selectAll('circle')
        .data(values)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', '5')
        .attr('data-xvalue', (item) => {return item['year']})
        //s => ms converter used to get new date object
        .attr('data-yvalue', (item) => {return new Date(item['Seconds']*1000)})
        //sets data values to their position on the x axis
        .attr('cx', (item) => {return xScale(item['Year'])})
};

//fetching JSON data
req.open('GET', url, true);
req.onload =()=> {
    values = JSON.parse(req.responseText)
    drawCanvas();
    generateScales();
    generateAxes();
    drawPoint();
}
req.send()



