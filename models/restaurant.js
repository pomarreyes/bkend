var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salaSchema = new Schema({
	name: String,
	direction: String,
	location: String,	
})

module.exports = mongoose.model('Restaurant',restaurantSchema);