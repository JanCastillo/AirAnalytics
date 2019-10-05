var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors', attribution: mbAttr}),
satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
light = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
satellitestreets = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr});

var map = L.map('map', {
center: [28.918 , -43.643], /*Default location */
zoom: 3, /*Default Zoom */
layers: [light] // Default basemaplayer on startrup, can also give another layer here to show by default)
});


var baseLayers = {
"Grayscale": grayscale,
"Streets": streets,
"Outdoors": outdoors,
"Satellite": satellite,
"Satellite Streets": satellitestreets,
"Dark Map": dark,
"Light Map": light
};

L.control.layers(baseLayers).addTo(map);


// Local geojson
var link = "static/data/airportsVF.geojson";

// Airplane Icon
function createCustomIcon (feature, latlng) {
  let myIcon = L.icon({
    iconUrl: 'static/pin.png',
    iconSize:     [20, 20], // width and height of the image in pixels
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon })
}

// create an options object that specifies which function will called on each feature
let myLayerOptions = {
  pointToLayer: createCustomIcon
}

var planeIcon = L.icon({
	iconUrl: 'static/plane4.png',
	iconSize:     [60, 60], // size of the icon
	iconAnchor:   [30, 35], // point of the icon which will correspond to marker's location
});

var startIcon = L.icon({
	iconUrl: 'static/pin2.png',
	iconSize:     [30, 30], // size of the icon
	iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
});

var endIcon = L.icon({
	iconUrl: 'static/pin3.png',
	iconSize:     [30, 30], // size of the icon
	iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
});

var dest="JFK";

latDest=0
lngDest=1


// // Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // console.log(data);
  var layer=data;
  layer.getFeaturesByProperty = function(key, value) {
    return this.features.filter(function(feature){
      if (feature.properties[key] === value) {
        return true;
      } else {
        return false;
      }
    });
  };
  
  var feats = layer.getFeaturesByProperty('IATA_Code', dest);
  latDest = feats[0].properties.Latitude_Decimal_Degrees;
  lngDest = feats[0].properties.Longitude_Decimal_Degrees;
  console.log(latDest);
  console.log(lngDest);

  var latCenter= latDest-19.436;
  var lngCenter= (lngDest+-99.072)/2;
 
  var coordinateArray = [ [19.436 , -99.072], [latDest, lngDest ] ];
  // or for example
  // here is the line you draw (if you want to see the animated marker path on the map)
  var myPolyline = L.polyline(coordinateArray, {color: "red", smoothFactor: 1, opacity: 0.2});
  myPolyline.addTo(map);
  // i don't know if i understood your question correctly
  // if you want to put a marker at the beginning and at the end of the path :
  var mstart = L.marker(coordinateArray[0], {icon: startIcon}).addTo(map);
 var mend = L.marker(coordinateArray[coordinateArray.length - 1], {icon: endIcon}).addTo(map);
 // here is the moving marker (6 seconds animation)
  var myMovingMarker = L.Marker.movingMarker(coordinateArray, 8000, {
      autostart: false, icon: planeIcon
  });
  map.addLayer(myMovingMarker);
  myMovingMarker.start();

  L.geoJson(data, myLayerOptions).addTo(map);
//    L.geoJson(data).addTo(map);
 });


//  var latDest= 48.354
//  var lngDest= 11.786
//  var latCenter= latDest-19.436;
//  var lngCenter= (lngDest+-99.072)/2;

//  var coordinateArray = [ [19.436 , -99.072], [latDest, lngDest ] ];
//  // or for example
//  // here is the line you draw (if you want to see the animated marker path on the map)
//  var myPolyline = L.polyline(coordinateArray, {color: "red", smoothFactor: 1, opacity: 0.2});
//  myPolyline.addTo(map);
//  // i don't know if i understood your question correctly
//  // if you want to put a marker at the beginning and at the end of the path :
//  var mstart = L.marker(coordinateArray[0], {icon: startIcon}).addTo(map);
// var mend = L.marker(coordinateArray[coordinateArray.length - 1], {icon: endIcon}).addTo(map);
// // here is the moving marker (6 seconds animation)
//  var myMovingMarker = L.Marker.movingMarker(coordinateArray, 8000, {
//      autostart: false, icon: planeIcon
//  });
//  map.addLayer(myMovingMarker);
//  myMovingMarker.start();

