var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var salaSchema = new Schema({
	nom: String,
	edif : String,
	num : Number,	
})

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Sala',salaSchema);