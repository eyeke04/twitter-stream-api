//db.js

var mongoose = require('mongoose');
mongoose.connect('mongodb://ikey001:Wayenoor10@ds161109.mlab.com:61109/ootchack');	//production

var Schema = mongoose.Schema;
var myModel = {};

var agencySchema = new Schema({
	name: String,
	website: String,
	email: String,
	facebook: String,
	twitter: String,
	loc: [{address:String, lng_lat: String}]
});

var serviceSchema = new Schema({
	name: String,
	agency_id: String,
	email: String,
	facebook: String,
	twitter: String,
	loc: [{address:String, lng_lat: String}]
});

myModel.agency = mongoose.model('Agency', agencySchema);

module.exports = myModel;