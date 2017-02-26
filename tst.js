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
 **

client.stream('statuses/filter', {track: 'lastma'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

/*
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

/*
client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body. 
  console.log(response);  // Raw response object. 
});
*/


var rep = {a: 'ds', ds: 'dsjkds', sdj: 'jsksd'};
console.log(Object.keys(rep));
for(i in Object.keys(rep)){
  console.log(Object.keys(rep)[i]);
}