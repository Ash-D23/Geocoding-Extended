var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');
var fetchAction = require('node-fetch');
//hasura ms logs -n backbitten72-user api
//config.projectConfig.url.data
router.route("/updatedetails").post(function(req, res){
var dname=req.body.name;
var dphone=req.body.phone_no;
var dcity=req.body.city;
const hasura_id = req.headers['x-hasura-user-id'];
const hasura_role = req.headers['x-hasura-role'];
const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];

var fetchAction =  require('node-fetch');

var url = config.projectConfig.url.data;

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        'X-Hasura-User-Id': hasura_id,
        'X-Hasura-Role': hasura_role

    }
};

var body = {
    "type": "update",
    "args": {
        "table": "Drivers",
        "where": {
            "Driver_id": {
                "$eq": hasura_id
            }
        },
        "$set": {
            "Name": dname,
            "Phone_No": dphone,
            "City": dcity
        }
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

router.route("/driver_details/:id").get(function(req, res){
var did=req.params.id;

  var fetchAction =  require('node-fetch');

var url = config.projectConfig.url.data;

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"

    }
};

var body = {
    "type": "select",
    "args": {
        "table": "Drivers",
        "columns": [
            "Name",
            "Phone_No",
            "City"
        ],
        "where": {
            "Driver_id": {
                "$eq": did
            }
        }
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
})

router.route("/drivers_list/:city").get(function (req,res){
  var dcity=req.params.city;
  var fetchAction =  require('node-fetch');

  var url = config.projectConfig.url.data;

  var requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  var body = {
      "type": "select",
      "args": {
          "table": "Drivers",
          "columns": [
              "Name",
              "City",
              "Phone_No"
          ],
          "where": {
              "City": {
                  "$eq": dcity
              }
          }
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

module.exports = router;
