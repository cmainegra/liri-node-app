require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var Twitter = require('twitter')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//below is the twitter call which i am convinced is failing because my env keys are off
//it seems they have recently changed their policy and i have to reapply for my access tokens.
if (process.argv[2] === "my-tweets") { 
    var params = { screen_name: 'everythingbage9' };
    client.get('statuses/user_timeline"', params, function (error, tweets, response) { 
        if (error) {
                console.log(error)
        }    else {
            for(let i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        }
    
    }
        // this should work under the documentation -- error code 34, says that page doesnt exist. unable to verify my keys are correct
    }
    )
};
if (process.argv[2] === 'spotify-this') { 
    for (let d = 3; d < process.argv.length; d++) { 
        var songName = process.argv[d];
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) { // the official spotify call with the query parameters, we're searching for song names in particular
        if (err) { // error logging
            console.log('Error occurred: ' + err);// console logging error
            return;
        }
        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Song Name: " + songs[i].name);
            console.log("Artist: " + songs[i].artist);;
        }
            // console.log(JSON.stringify(data)); // returns a massive amount of data unable to parsecon
        //having trouble parsing the JSON object into something I want. right now stringify is the only thing that works.
    })
};

if (process.argv[2] === 'movie-this') { 
    for (let c = 3; c < process.argv.length; c++) { 
        var movieName = "'" + process.argv[c]; + "'"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) { // parsing through the returned data.
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
