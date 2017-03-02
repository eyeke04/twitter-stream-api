module.exports = function(io, client) {
	var router = require('express').Router();

	var db = require('./../config/db');
	var reportModel = db.reports;

	//db.reports.drop();
	/*
		status codes:
		'00' => successful
		'01' => retry
	*/


	router.get('/', function(req, res, next) {
		//fetches all reports
		reportModel.find({}, function(err, reports) {
			if (err) {
				console.log(err);
				return res.send({status: '01', msg: 'Something went wrong, please retry'});
			}
			if (!reports || reports === []) {
				//No reports
				return res.send({status: '00', msg: 'No reports yet'});
			}
			//else report was successful
			return res.send({status: '00', msg: 'Successful', data: reports});
		})
	});

	router.get('/:id', function(req, res, next) {
		// get report by id
		var report_id = req.params.id.toString();
		reportModel.findById(report_id, function(err,report) {
			if (err) {
				console.log(err);
				return res.send({status: '01', msg: 'Something went wrong, please retry'});
			}
			if (!report) {
				//No reports
				return res.send({status: '00', msg: 'Report not found'});
			}
			//else report was successful
			return res.send({status: '00', msg: 'Successful', data: report});
		})
	})

	router.get('/find', function(req, res, next) {
		// finds 
		var find_req = req.params;
		var q = {}
		if (!find) {
			return res.send({status: '01', msg: 'Please send a term to retrieve'});
		}
		switch(Object.keys(find_req)[0]){
			case 'tag':
				q = {tags: find_req.tag};
				break;
			case 'agency':
				q = {agency_id: find_req.agency}
				break;
			case 'status':
				q = {status: find_req.status}
				break;
			case 'cso':
				q = {cso: find_req.cso}
				break;

		}
		reportModel.find(q, function(err, reports) {
			if (err) {
				return res.send({status: '01', msg: 'Something went wrong, please retry'});
			}
			if (!reports || reports === []) {
				return res.send({status: '00', msg: 'No reports found'});
			}
			return res.send({status: '00', msg: 'Successful', data: reports});
		})
	});

	router.post('/new',function(req, res, next) {
		// save new report
		var q = {};
		q = req.body;

		if (q.source === 'site') {
			q.activity_log = [];
			q.status = 'Reported';
			q.initial_report = {source: 'site', date: Date()};
			q.activity_log.push({activity: 'Report submitted on website', date: Date.now(), by: 'User', status_changed_to: 'Reported'});	
		}else{
			//coming from external source. 
			//q.initial_report = {source: req.body.source, text: req.body.text, embed_link: req.body.link, date: Date.now()};
		}
			
		newReport = new reportModel(q);
		newReport.save(function(err, savedReport) {
			if (err) {
				return res.send({status: '01', msg: 'Something went wrong, please retry'});
			}
			io.emit('newnotification', {
		      message: 'new tweet',
		      tweet: req.body
		    });

			
		    client.post('statuses/update', {status: '@' + q.initial_report.user + ' We hear you loud and clear. Visit bit.ly/rant/'+ savedReport.id  + 'to provide more info', in_reply_to_status_id: q.initial_report.source_id.id_str},  function(error, tweet, response) {
			  if(error)
			  console.log(tweet);  // Tweet body. 
			  console.log(response);  // Raw response object. 
			});

			return res.send({status: '00', msg: 'Successful', data: savedReport});
		});

	});
	return router;
}