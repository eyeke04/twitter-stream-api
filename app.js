//To do
//	1. implement sessions, use it to track multiple login attempts, verification attempts and invalid pin entries 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/*** socket.io stream **/
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

var reports = require('./routes/report');

app.use('/report', reports);

app.use(express.static(__dirname + '/public'));

/*******
[*]
[*]		Twitter stream
[*]
********/
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: '7ZCLpQd84ZtlpOtAQXMuErb17',
  consumer_secret: 'mTHN1mWizTjzTyw6bOeCxbq1y1Mi3kn38tB88iNIjy78u0L5f7',
  access_token_key: '219571619-CDh5Y684ajzSzWZ4iPbc4MBJqi1YhFMabM8nYrsX',
  access_token_secret: 'SPTF5BZaqcfbjyB3QwQkWnZbupNyR36ZnVyTfl8QV7EO9'
});

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