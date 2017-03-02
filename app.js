//To do
//	1. implement sessions, use it to track multiple login attempts, verification attempts and invalid pin entries 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/*** socket.io stream **/
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.settings.env === 'production') {
  console.log('we are in ', app.settings.env);
}
  
app.use(methodOverride(function (req, res) {
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    //look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

/*******
[*]
[*]   Twitter stream
[*]
********/
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'MOCbONrYqhPDBLo8VqoNnw3J1',
  consumer_secret: 'o1cIkeGQnQBy0XszUzmoZUQTkCaj4qKSYv7Q7Wp1FyOohCKo2S',
  access_token_key: '835439139122200576-umVVWyETodBXRyFKlmLvR79yVCEVq6R',
  access_token_secret: 'Up4Q9dBcXUMOp8Qv7I0uu6PsGshh2ItSITMyUfeMsK0b9'
});

var reports = require('./routes/report')(io, client);

app.use('/report', reports);

app.get('/rant', function(req, res) {
  res.sendFile(__dirname + '/public/myreview.com.ng/form1.html');
});

app.get('/history', function(req, res) {
  res.sendFile(__dirname + '/public/myreview.com.ng/history/history.html');
});

app.get('/dashboard', function(req, res) {
  res.sendFile(__dirname + '/public/myreview.com.ng/dashboard/dashboard.html');
});

app.use(express.static(__dirname + '/public/myreview.com.ng'));


/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/

client.stream('statuses/filter', {track: 'lastma'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    io.emit('notification', {
      message: 'new tweet',
      tweet: tweet
    });
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});



io.on('connection', function(socket) {
  console.log('new connection');
  socket.on('add-report', function(customer) {
    console.log('Action from front-end');
  });


});

server.listen(4041, function() {
  console.log('server up and running at 4041 port');
});

module.exports = app;