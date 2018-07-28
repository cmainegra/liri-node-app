require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var Twitter = require('twitter')

var spotify = new Spotify("./keys.spotify");
var client = new Twitter("./keys.twitter");

if (process.argv[2] === "my-tweets") {
    var params = { screen_name: 'everythingbage9' };
    client.get('statuses/read', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        // this should work under the documentation -- error code 34, says that page doesnt exist. unable to verify my keys are correct
    }
    )
};
if (process.argv[2] === 'spotify-this') {
    for (let d = 2; d < process.argv.length; d++) {
        var songName = process.argv[d]
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            console.log(JSON.stringify(data));
        }
    })
};
//having trouble with keys, and getting responses in general. i check back in later.
if (process.argv[2] === 'movie-this') {
    for (let c = 2; c < process.argv.length; c++) {
        var movieName = "'" + process.argv[c]; + "'"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Rating);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        }
    })
};

