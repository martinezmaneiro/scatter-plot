//these are gonna be used to fetch JSON data from the dataset into the values variable
let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();
let values = [];
//fetching JSON data
req.open('GET', url, true);
req.onload =()=> {
    values = JSON.parse(req.responseText)
}
req.send()

//svg dimensions
let width = 800;
let height = 600;
let padding = 40;



