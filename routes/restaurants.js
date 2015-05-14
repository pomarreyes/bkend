
/*
 * routes/restaurants.js
*/

// dependencies
var geocoder = require('geocoder');

//  db model for restaurant
var Restaurant = require("../models/restaurant.js");



/**
 * POST '/api/restaurants'
 */

exports.create = function(req,res){

	console.log(req.body);

	// pull out the name and location
	var name = req.body.name;
	var direction = req.body.direction;
	var location = req.body.location;
	//now, geocode that location
	geocoder.geocode(location, function ( err, data ) {

		console.log(data);
  	
  	// if we get an error, or don't have any results, respond back with error
  	if (err || data.status == 'ZERO_RESULTS'){
  		var jsonData = {status:'ERROR', message: 'Error finding location'};
  		res.json(jsonData);
  	}

	  var _sala = Sala({
	  	name: name,
	  	direction: direction,
	  	location: location
	  });

	  _sala.save(function(err,data){
	  	// if err saving, respond back with error
	  	if (err){
	  		var jsonData = {status:'ERROR', message: 'Error saving restaurant'};
	  		return res.json(jsonData);
	  	}

	  	console.log('saved a new sala!');
	  	console.log(data);

	  	// now return the json data of the new restaurant
	  	var jsonData = {
	  		status: 'OK',
	  		_sala: data
	  	}

	  	return res.json(jsonData);

	  })

	});		
}

/**
 * GET '/api/get/:id'
 * Receives a GET request specifying the user to get
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */

// exports.getOne = function(req,res){

// 	var requestedId = req.param('id');

// 	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
// 	restaurant.findById(requestedId, function(err,data){

// 		// if err or no user found, respond with error 
// 		if(err || data == null){
//   		var jsonData = {status:'ERROR', message: 'Could not find that restaurant'};
//   		 return res.json(jsonData);
//   	}

//   	// otherwise respond with JSON data of the user
//   	var jsonData = {
//   		status: 'OK',
//   		restaurant: data
//   	}

//   	return res.json(jsonData);
	
// 	})
// }

/**
 * GET '/api/get'
 * Receives a GET request to get all user details
 * @return {Object} JSON
 */

exports.getAll = function(req,res){

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.find
	restaurant.find(function(err, data){
		// if err or no users found, respond with error 
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find salas'};
  		return res.json(jsonData);
  	}

  	// otherwise, respond with the data	
  	res.json(data);

	})

}

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the user to update, updates db, responds back
//  * @param  {String} req.param('id'). The userId to update
//  * @param  {Object} req. An object containing the different attributes of the restaurant
//  * @return {Object} JSON
//  */

// exports.update = function(req,res){

// 	var requestedId = req.param('id');

// 	// pull out the name and location
// 	var name = req.body.name;
// 	var location = req.body.location;

// 	//now, geocode that location
// 	geocoder.geocode(location, function ( err, data ) {

// 		console.log(data);
  	
//   	// if we get an error, or don't have any results, respond back with error
//   	if (err || data.status == 'ZERO_RESULTS'){
//   		var jsonData = {status:'ERROR', message: 'Error finding location'};
//   		res.json(jsonData);
//   	}

//   	// otherwise, update the user

// 	  var locationName = data.results[0].formatted_address; // the location name
// 	  var lon = data.results[0].geometry.location.lng;
// 		var lat = data.results[0].geometry.location.lat;
  	
//   	// need to put the geo co-ordinates in a lng-lat array for saving
//   	var lnglat_array = [lon,lat];

// 	  var dataToUpdate = {
// 	  	name: name,
// 	  	locationName: locationName,
// 	  	locationGeo: lnglat_array
// 	  };

// 	  // now, update that restaurant
// 		// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
// 	  restaurant.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
// 	  	// if err saving, respond back with error
// 	  	if (err){
// 	  		var jsonData = {status:'ERROR', message: 'Error updating restaurant'};
// 	  		return res.json(jsonData);
// 	  	}

// 	  	console.log('updated the restaurant!');
// 	  	console.log(data);

// 	  	// now return the json data of the new restaurant
// 	  	var jsonData = {
// 	  		status: 'OK',
// 	  		restaurant: data
// 	  	}

// 	  	return res.json(jsonData);

// 	  })

// 	});

// }

// /**
//  * GET '/api/delete/:id'
//  * Receives a GET request specifying the user to delete
//  * @param  {String} req.param('id'). The userId
//  * @return {Object} JSON
//  */

// exports.remove = function(req,res){

// 	var requestedId = req.param('id');

// 	// Mongoose method, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
// 	restaurant.findByIdAndRemove(requestedId,function(err, data){
// 		if(err || data == null){
//   		var jsonData = {status:'ERROR', message: 'Could not find that restaurant to delete'};
//   		return res.json(jsonData);
// 		}

// 		// otherwise, respond back with success
// 		var jsonData = {
// 			status: 'OK',
// 			message: 'Successfully deleted id ' + requestedId
// 		}

// 		res.json(jsonData);

// 	})

// }