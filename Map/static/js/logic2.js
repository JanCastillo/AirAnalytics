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
// var link = "static/data/airportsVF.geojson";
var link = {
  "type": "FeatureCollection",
  "name": "airportsVF",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  { "type": "Feature", "properties": { "ICAO_Code": "CYUL", "IATA_Code": "YUL", "Airport_Name": "MONTREAL INTERNATIONAL DORVAL", "City\/Town": "MONTREAL", "Country": "CANADA", "Latitude_Degrees": 45, "Latitude_Minutes": 28, "Latitude_Seconds": 5, "Latitude_Direction": "N", "Longitude_Degrees": 73, "Longitude_Minutes": 44, "Longitude_Seconds": 29, "Longitude_Direction": "W", "Altitude": 36, "Latitude_Decimal_Degrees": 45.468, "Longitude_Decimal_Degrees": -73.741 }, "geometry": { "type": "Point", "coordinates": [ -73.741, 45.468 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "CYYZ", "IATA_Code": "YYZ", "Airport_Name": "LESTER B PEARSON INTERNATIONAL", "City\/Town": "TORONTO", "Country": "CANADA", "Latitude_Degrees": 43, "Latitude_Minutes": 40, "Latitude_Seconds": 38, "Latitude_Direction": "N", "Longitude_Degrees": 79, "Longitude_Minutes": 37, "Longitude_Seconds": 50, "Longitude_Direction": "W", "Altitude": 174, "Latitude_Decimal_Degrees": 43.677, "Longitude_Decimal_Degrees": -79.631 }, "geometry": { "type": "Point", "coordinates": [ -79.631, 43.677 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "EDDM", "IATA_Code": "MUC", "Airport_Name": "MUNICH", "City\/Town": "MUNICH", "Country": "GERMANY", "Latitude_Degrees": 48, "Latitude_Minutes": 21, "Latitude_Seconds": 13, "Latitude_Direction": "N", "Longitude_Degrees": 11, "Longitude_Minutes": 47, "Longitude_Seconds": 9, "Longitude_Direction": "E", "Altitude": 454, "Latitude_Decimal_Degrees": 48.354, "Longitude_Decimal_Degrees": 11.786 }, "geometry": { "type": "Point", "coordinates": [ 11.786, 48.354 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KDEN", "IATA_Code": "DEN", "Airport_Name": "DENVER INTERNATIONAL", "City\/Town": "DENVER", "Country": "USA", "Latitude_Degrees": 39, "Latitude_Minutes": 51, "Latitude_Seconds": 30, "Latitude_Direction": "N", "Longitude_Degrees": 104, "Longitude_Minutes": 40, "Longitude_Seconds": 1, "Longitude_Direction": "W", "Altitude": 1656, "Latitude_Decimal_Degrees": 39.858, "Longitude_Decimal_Degrees": -104.667 }, "geometry": { "type": "Point", "coordinates": [ -104.667, 39.858 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KJFK", "IATA_Code": "JFK", "Airport_Name": "JOHN F KENNEDY INTERNATIONAL", "City\/Town": "NEW YORK", "Country": "USA", "Latitude_Degrees": 40, "Latitude_Minutes": 38, "Latitude_Seconds": 23, "Latitude_Direction": "N", "Longitude_Degrees": 73, "Longitude_Minutes": 46, "Longitude_Seconds": 44, "Longitude_Direction": "W", "Altitude": 4, "Latitude_Decimal_Degrees": 40.64, "Longitude_Decimal_Degrees": -73.779 }, "geometry": { "type": "Point", "coordinates": [ -73.779, 40.64 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KLAS", "IATA_Code": "LAS", "Airport_Name": "MC CARRAN INTERNATIONAL", "City\/Town": "LAS VEGAS", "Country": "USA", "Latitude_Degrees": 36, "Latitude_Minutes": 4, "Latitude_Seconds": 49, "Latitude_Direction": "N", "Longitude_Degrees": 115, "Longitude_Minutes": 9, "Longitude_Seconds": 8, "Longitude_Direction": "W", "Altitude": 665, "Latitude_Decimal_Degrees": 36.08, "Longitude_Decimal_Degrees": -115.152 }, "geometry": { "type": "Point", "coordinates": [ -115.152, 36.08 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KLAX", "IATA_Code": "LAX", "Airport_Name": "LOS ANGELES INTERNATIONAL", "City\/Town": "LOS ANGELES", "Country": "USA", "Latitude_Degrees": 33, "Latitude_Minutes": 56, "Latitude_Seconds": 33, "Latitude_Direction": "N", "Longitude_Degrees": 118, "Longitude_Minutes": 24, "Longitude_Seconds": 29, "Longitude_Direction": "W", "Altitude": 39, "Latitude_Decimal_Degrees": 33.942, "Longitude_Decimal_Degrees": -118.408 }, "geometry": { "type": "Point", "coordinates": [ -118.408, 33.942 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KMCO", "IATA_Code": "MCO", "Airport_Name": "ORLANDO INTERNATIONAL", "City\/Town": "ORLANDO", "Country": "USA", "Latitude_Degrees": 28, "Latitude_Minutes": 25, "Latitude_Seconds": 44, "Latitude_Direction": "N", "Longitude_Degrees": 81, "Longitude_Minutes": 18, "Longitude_Seconds": 57, "Longitude_Direction": "W", "Altitude": 30, "Latitude_Decimal_Degrees": 28.429, "Longitude_Decimal_Degrees": -81.316 }, "geometry": { "type": "Point", "coordinates": [ -81.316, 28.429 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KMIA", "IATA_Code": "MIA", "Airport_Name": "MIAMI INTERNATIONAL", "City\/Town": "MIAMI", "Country": "USA", "Latitude_Degrees": 25, "Latitude_Minutes": 47, "Latitude_Seconds": 35, "Latitude_Direction": "N", "Longitude_Degrees": 80, "Longitude_Minutes": 17, "Longitude_Seconds": 26, "Longitude_Direction": "W", "Altitude": 3, "Latitude_Decimal_Degrees": 25.793, "Longitude_Decimal_Degrees": -80.291 }, "geometry": { "type": "Point", "coordinates": [ -80.291, 25.793 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KORD", "IATA_Code": "ORD", "Airport_Name": "CHICAGO OHARE INTERNATIONAL", "City\/Town": "CHICAGO", "Country": "USA", "Latitude_Degrees": 41, "Latitude_Minutes": 58, "Latitude_Seconds": 46, "Latitude_Direction": "N", "Longitude_Degrees": 87, "Longitude_Minutes": 54, "Longitude_Seconds": 16, "Longitude_Direction": "W", "Altitude": 204, "Latitude_Decimal_Degrees": 41.979, "Longitude_Decimal_Degrees": -87.904 }, "geometry": { "type": "Point", "coordinates": [ -87.904, 41.979 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "KSFO", "IATA_Code": "SFO", "Airport_Name": "SAN FRANCISCO INTERNATIONAL", "City\/Town": "SAN FRANCISCO", "Country": "USA", "Latitude_Degrees": 37, "Latitude_Minutes": 37, "Latitude_Seconds": 8, "Latitude_Direction": "N", "Longitude_Degrees": 122, "Longitude_Minutes": 22, "Longitude_Seconds": 29, "Longitude_Direction": "W", "Altitude": 4, "Latitude_Decimal_Degrees": 37.619, "Longitude_Decimal_Degrees": -122.375 }, "geometry": { "type": "Point", "coordinates": [ -122.375, 37.619 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "LEBL", "IATA_Code": "BCN", "Airport_Name": "BARCELONA", "City\/Town": "BARCELONA", "Country": "SPAIN", "Latitude_Degrees": 41, "Latitude_Minutes": 17, "Latitude_Seconds": 49, "Latitude_Direction": "N", "Longitude_Degrees": 2, "Longitude_Minutes": 4, "Longitude_Seconds": 42, "Longitude_Direction": "E", "Altitude": 4, "Latitude_Decimal_Degrees": 41.297, "Longitude_Decimal_Degrees": 2.078 }, "geometry": { "type": "Point", "coordinates": [ 2.078, 41.297 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "LEMD", "IATA_Code": "MAD", "Airport_Name": "BARAJAS", "City\/Town": "MADRID", "Country": "SPAIN", "Latitude_Degrees": 40, "Latitude_Minutes": 28, "Latitude_Seconds": 20, "Latitude_Direction": "N", "Longitude_Degrees": 3, "Longitude_Minutes": 33, "Longitude_Seconds": 39, "Longitude_Direction": "W", "Altitude": 610, "Latitude_Decimal_Degrees": 40.472, "Longitude_Decimal_Degrees": -3.561 }, "geometry": { "type": "Point", "coordinates": [ -3.561, 40.472 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "MMUN", "IATA_Code": "CUN", "Airport_Name": "CANCUN INTERNATIONAL", "City\/Town": "CANCUN", "Country": "MEXICO", "Latitude_Degrees": 21, "Latitude_Minutes": 2, "Latitude_Seconds": 11, "Latitude_Direction": "N", "Longitude_Degrees": 86, "Longitude_Minutes": 52, "Longitude_Seconds": 37, "Longitude_Direction": "W", "Altitude": 7, "Latitude_Decimal_Degrees": 21.036, "Longitude_Decimal_Degrees": -86.877 }, "geometry": { "type": "Point", "coordinates": [ -86.877, 21.036 ] } },
  { "type": "Feature", "properties": { "ICAO_Code": "MUHA", "IATA_Code": "HAV", "Airport_Name": "JOSE MARTI INTERNATIONAL", "City\/Town": "HAVANA", "Country": "CUBA", "Latitude_Degrees": 22, "Latitude_Minutes": 59, "Latitude_Seconds": 21, "Latitude_Direction": "N", "Longitude_Degrees": 82, "Longitude_Minutes": 24, "Longitude_Seconds": 33, "Longitude_Direction": "W", "Altitude": 65, "Latitude_Decimal_Degrees": 22.989, "Longitude_Decimal_Degrees": -82.409 }, "geometry": { "type": "Point", "coordinates": [ -82.409, 22.989 ] } }
  ]
  }


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

L.geoJson(link, myLayerOptions).addTo(map)

link.getFeaturesByProperty = function(key, value) {
      return this.features.filter(function(feature){
        if (feature.properties[key] === value) {
          return true;
        } else {
          return false;
        }
      });
    };
    
    var feats = link.getFeaturesByProperty('IATA_Code', dest);
    latDest = feats[0].properties.Latitude_Decimal_Degrees;
    lngDest = feats[0].properties.Longitude_Decimal_Degrees;
    console.log(latDest);
    console.log(lngDest)

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



    
// // Grabbing our GeoJSON data..
// d3.json(link, function(data) {
//   // console.log(data);
//   var layer=data;
//   layer.getFeaturesByProperty = function(key, value) {
//     return this.features.filter(function(feature){
//       if (feature.properties[key] === value) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//   };
  
//   var feats = layer.getFeaturesByProperty('IATA_Code', dest);
//   latDest = feats[0].properties.Latitude_Decimal_Degrees;
//   lngDest = feats[0].properties.Longitude_Decimal_Degrees;
//   console.log(latDest);
//   console.log(lngDest);

//   var latCenter= latDest-19.436;
//   var lngCenter= (lngDest+-99.072)/2;
 
//   var coordinateArray = [ [19.436 , -99.072], [latDest, lngDest ] ];
//   // or for example
//   // here is the line you draw (if you want to see the animated marker path on the map)
//   var myPolyline = L.polyline(coordinateArray, {color: "red", smoothFactor: 1, opacity: 0.2});
//   myPolyline.addTo(map);
//   // i don't know if i understood your question correctly
//   // if you want to put a marker at the beginning and at the end of the path :
//   var mstart = L.marker(coordinateArray[0], {icon: startIcon}).addTo(map);
//  var mend = L.marker(coordinateArray[coordinateArray.length - 1], {icon: endIcon}).addTo(map);
//  // here is the moving marker (6 seconds animation)
//   var myMovingMarker = L.Marker.movingMarker(coordinateArray, 8000, {
//       autostart: false, icon: planeIcon
//   });
//   map.addLayer(myMovingMarker);
//   myMovingMarker.start();

//   L.geoJson(data, myLayerOptions).addTo(map);
// //    L.geoJson(data).addTo(map);
//  });


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

