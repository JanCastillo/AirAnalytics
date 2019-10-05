// Creating map object

var map = L.map("map", {
  center: [19.436 , -99.072],
  zoom: 6
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(map);

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);


// Local geojson
  var link = "static/data/mx_airports.geojson";

// Airplane Icon
function createCustomIcon (feature, latlng) {
  let myIcon = L.icon({
    iconUrl: 'static/pin.png',
    iconSize:     [40, 40], // width and height of the image in pixels
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon })
}

// create an options object that specifies which function will called on each feature
let myLayerOptions = {
  pointToLayer: createCustomIcon
}


// // Grabbing our GeoJSON data..
 d3.json(link, function(data) {
//   // Creating a GeoJSON layer with the retrieved data
   L.geoJson(data, myLayerOptions).addTo(map);
 });


 var line = [
  [19.436 , -99.072],
  [24.764, -107.474]
];

// // Create a polyline using the line coordinates and pass in some initial options
L.polyline(line, {
  color: "red"
}).addTo(map);