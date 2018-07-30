require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var Twitter = require('twitter')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2] === "my-tweets") { //tinkered around with the notation, unable to fully process this api call, a little worried i watched youtube guides and it seemed much easier.
    var params = { screen_name: 'everythingbage9' };// my twitter account of my girlfriends cat.
    client.get('statuses/read', params, function (error, tweets, response) { // the actual api call, with what i want it to return.
        if (error) {
            console.log(response.tweets); //seems to be an error because it's returning this undefined.
        }
        // this should work under the documentation -- error code 34, says that page doesnt exist. unable to verify my keys are correct
    }
    )
};
if (process.argv[2] === 'spotify-this') { // initial call from spotify
    for (let d = 3; d < process.argv.length; d++) { // ensures the last of the arguments typed in are just one solid string.
        var songName = process.argv[d] //the pairing of the final argument words in the object.
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) { // the official spotify call with the query parameters, we're searching for song names in particular
        if (err) { // error logging
            console.log('Error occurred: ' + err);// console logging error
            return;
        }
        else {
            console.log(JSON.stringify(data)); // returns a massive amount of data unable to.
        }//having trouble parsing the JSON object into something I want. right now stringify is the only thing that works.
    })
};
//having trouble with keys, and getting responses in general. i check back in later.
if (process.argv[2] === 'movie-this') {  //this call seems to be working the way i'd like, its the only npm call that actually works it looks like.
    for (let c = 3; c < process.argv.length; c++) { // the same thing to ensure the final words of whats typed into the console turn into a string to be searched.
        var movieName = "'" + process.argv[c]; + "'" //just shooting from the hip.
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
