var express = require('express');
var app = express();
const request = require('request');
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: true }));

// routes will go here

// http://localhost:3000/api/address?origin=chennai&destination=delhi
app.get('/api/address', function(req, res) {
  var origin = req.param('origin');
  var destination = req.param('destination');

  request({
       url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyAJha5SIHs-vthVRJ7sh2Ldex0XkT53IzE`,
       json: true
     },(error,response,body) =>{
       console.log(`distance: ${body.rows[0].elements[0].distance.text}`);
       console.log(`duration: ${body.rows[0].elements[0].duration.text}`);

       var encodedorigin = encodeURIComponent(origin);
       var encodeddest = encodeURIComponent(destination);

       var glink = `https://www.google.co.in/maps/dir/${encodedorigin}/${encodeddest}/`;

       var m = {
         "distance": body.rows[0].elements[0].distance.text,
         "duration": body.rows[0].elements[0].duration.text,
         "link": glink
       };

       res.send(JSON.stringify(m));

  });

});
//API KEY: AIzaSyAPMSp9sltl2i5wbL3vwuV984rPYWuTVWQ
// http://localhost:3000/api/location/chennai
app.get('/api/location/:location', function(req, res) {
	var loc=req.params.location;

  request({
       url: `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=AIzaSyAPMSp9sltl2i5wbL3vwuV984rPYWuTVWQ`,
       json: true
     },(error,response,body) =>{

console.log(body.results[0].formatted_address);
console.log(body.results[0].geometry.location.lat);
console.log(body.results[0].geometry.location.lng);


var c = {
  "formatted address": body.results[0].formatted_address,
  "latitude": body.results[0].geometry.location.lat,
  "longitude": body.results[0].geometry.location.lng
};

res.send(JSON.stringify(c));

});

});

// http://localhost:3000/api/coordinates?lat=13.0826802&long=80.2707184
app.get('/api/coordinates', function(req, res) {
  var lat = req.param('lat');
  var long = req.param('long');

  console.log(lat,long);

  request({
       url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAPMSp9sltl2i5wbL3vwuV984rPYWuTVWQ`,
       json: true
     },(error,response,body) =>{

console.log(body.results[0].formatted_address);


var a = {
  "formatted address": body.results[0].formatted_address
};

res.send(JSON.stringify(a));

});

});


app.listen(port);
console.log('Server started! At http://localhost:' + port);
