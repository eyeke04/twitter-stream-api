//db.js

var mongoose = require('mongoose');
mongoose.connect('mongodb://ikey001:Wayenoor10@ds161179.mlab.com:61179/ootchack', function(err) {
	if (err) {
		console.log(err);
	}
});	//production


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

var csoSchema = new Schema({
	name: String,
	tags: [String], //list of tags that this agency is following ex. rape, health, immigration, education,
	email: String,
	facebook: String,
	twitter: String,
	tracking_keywords: [String], //keywords we track on social media for this agency
	loc: [{address:String, lng_lat: String}]
});

var reportSchema = new Schema({
	report: String,
	location: String,
	dateReported: Date, //date the full report was collected
	agency_id: String,
	cso: [String], //list of CSOs that follow up on cases like these
	follow_up_to: String,	//id of a report that the user is responding to
	tags: [String],
	reporter: Object, //{phone: '', email: '', twitter: '', facebook: ''}
	initial_report: Object, //{source: '', text:'', embed_link: '', date: Date} //where original complaint was collected from. Others include twitter, call, sms
	status: String, //received, forwarded, acknowledged, resolved
	activity_log: [{activity: String, date: Date, by: String, status_changed_to: String, }],
	supports: Number
});


myModel.agency = mongoose.model('Agency', agencySchema);
myModel.reports = mongoose.model('Reports', reportSchema);
myModel.cso = mongoose.model('CSO', csoSchema);

module.exports = myModel;