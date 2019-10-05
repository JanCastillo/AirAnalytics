// Creating map object
var map = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
});

// Adding tile layer
L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    }
).addTo(map);

// If data.beta.nyc is down comment out this link
//var link = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
//"35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";

// Uncomment this link local geojson for when data.beta.nyc is down
var link = "static/data/airports.geojson";

console.log(link);
d3.json(link, function(data) {
    console.log(data.features);
});

// Airplane Icon
// var greenIcon = new L.Icon({
// 	iconUrl: 'static/plane.png',
// 	//shadowUrl: 'leaf-shadow.png',
// 	iconSize:     [38, 95], // size of the icon
// 	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
// 	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

// function createCustomIcon(feature, latlng) {
//     let myIcon = L.icon({
//         iconUrl: "static/plane.png",
//         //  shadowUrl: 'my-icon.png',
//         iconSize: [25, 25], // width and height of the image in pixels
//         //  shadowSize:   [35, 20], // width, height of optional shadow image
//         iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//         //  shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
//         popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
//     });
//     return L.marker(latlng, { icon: myIcon });
// }

// // create an options object that specifies which function will called on each feature
// let myLayerOptions = {
//     pointToLayer: createCustomIcon
// };

// // Grabbing our GeoJSON data..
d3.json(link, function(data) {
    console.log(data);
    //   // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, myLayerOptions).addTo(map);
});

//  var line = [
//   [45.51, -122.68],
//   [45.50, -122.60],
//   [45.48, -122.70],
//   [45.54, -122.75]
// ];

// // Create a polyline using the line coordinates and pass in some initial options
// L.polyline(line, {
//   color: "red"
// }).addTo(myMap);