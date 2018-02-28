var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('request-debug')(request);
var geocoder = require('geocoder');
app.use(cookieParser());
var dataRouter = require('./data');
var config = require('./config');
var server = require('http').Server(app);
router.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// http://localhost:3000/api/address?origin=chennai&destination=delhi
app.get('/api/address', function(req, res) {
  var origin = req.query.origin;
  var destination = req.query.destination;
  console.log(origin,destination);

  request({
       url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyAJha5SIHs-vthVRJ7sh2Ldex0XkT53IzE`,
       json: true
     },(error,response,body) =>{

       var encodedorigin = encodeURIComponent(origin);
       var encodeddest = encodeURIComponent(destination);

       var glink = `https://www.google.co.in/maps/dir/${encodedorigin}/${encodeddest}/`;
       var distance = body.rows[0].elements[0].distance.value;
       var cost = distance*0.002;

       var m = {
         "distance": body.rows[0].elements[0].distance.text,
         "duration": body.rows[0].elements[0].duration.text,
         "cost":cost,
         "link": glink
       };

       res.send(JSON.stringify(m));
  });
});

// http://localhost:3000/api/location/chennai
app.get('/api/location/:location', function(req, res) {
	var loc=req.params.location;

// Geocoding
geocoder.geocode(loc, function ( err, data ) {

  var c = {
    "formatted address": data.results[0].formatted_address,
    "latitude": data.results[0].geometry.location.lat,
    "longitude": data.results[0].geometry.location.lng
  };

  res.send(JSON.stringify(c));

});

});

// http://localhost:3000/api/coordinates?lat=13.0826802&long=80.2707184
app.get('/api/coordinates', function(req, res) {
  var lat = req.query.lat;
  var long = req.query.long;

  // Reverse Geocoding
geocoder.reverseGeocode( lat, long, function ( err, data ) {

  var a = {
    "formatted address": data.results[0].formatted_address
  };

  res.send(JSON.stringify(a));

});

});


app.post('/signup', function (req, res) {
  var duser=req.body.username;
  var dpass=req.body.password;

  var fetchAction =  require('node-fetch');

  var url = "https://auth.backbitten72.hasura-app.io/v1/signup";

  var requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  var body = {
      "provider": "username",
      "data": {
          "username": duser,
          "password": dpass
      }
  };

  requestOptions.body = JSON.stringify(body);

  fetchAction(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	res.json(result);
  })
  .catch(function(error) {
    res.status(500).json({
      message: "access denied"
    });
  });


});

app.post('/login', function (req, res) {
  var duser=req.body.username;
  var dpass=req.body.password;

  var fetchAction =  require('node-fetch');

  var url = "https://auth.backbitten72.hasura-app.io/v1/login";

  var requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

 var body = {
      "provider": "username",
      "data": {
          "username": duser,
          "password": dpass
      }
  };

  requestOptions.body = JSON.stringify(body);

  fetchAction(url, requestOptions)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
   res.json(result);
    })
  .catch(function(error) {
    res.status(500).json({
      message: "access denied"
    });
  });

});

app.post('/logout', function( req, res){
  const hasura_id = req.headers['x-hasura-user-id'];
  const hasura_role = req.headers['x-hasura-role'];
  const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];

  var fetchAction =  require('node-fetch');

  var url = "https://auth.backbitten72.hasura-app.io/v1/user/logout";

  var requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json",
          'X-Hasura-User-Id': hasura_id,
          'X-Hasura-Role': hasura_role

      }
  };

  fetchAction(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	res.json(result);
  })
  .catch(function(error) {
    res.status(500).json({
      message: "access denied"
    });
  });

})

app.post('/insertdriver', function (req, res) {
  const hid = req.headers['x-hasura-user-id'];
  const hrole = req.headers['x-hasura-role'];
  const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];

var dname = req.body.name;
var dcity = req.body.city;
var dphone = req.body.phone_no;
//var hid=req.body.hasura_id;

//var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
var fetchAction =  require('node-fetch');

var url = config.projectConfig.url.data;

var requestOptions = {
"method": "POST",
"headers": {
    "Content-Type": "application/json",
    'X-Hasura-User-Id': hid,
    'X-Hasura-Role': hrole,
    "X-Hasura-Allowed-Roles": hasura_allowed_role

}
};

var body = {
"type": "insert",
"args": {
    "table": "Drivers",
    "objects": [
        {
            "Name": dname,
            "City": dcity,
            "Phone_No": dphone,
            "Driver_id": hid
        }
    ]
}
};

requestOptions.body = JSON.stringify(body);

fetchAction(url, requestOptions)
.then(function(response) {
return response.json();
})
.then(function(result) {
res.json(result);
})
.catch(function(error) {
res.status(500).json({
  message: "access denied"
});
});
});


app.get('/', function(req, res){
res.send('<h3>T49 Backend API - Ashutosh </h3>');
});

app.use('/', dataRouter);


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
