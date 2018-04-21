require("dotenv").config();

const fs = require("fs");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var keys = require("./keys.js");

let client = new Twitter(keys.twitter);

let spotify = new Spotify(keys.spotify);

let arg1 = process.argv[2];

let arg2 = process.argv[3];

switch (arg1) {
    case 'mi-tweets':
        client.get('statuses/home_timeline', function(error, tweets, response) {
            if (error) throw error;
            console.log(tweets);
        });
        break;
    case 'spotify-this-song':
        spotify.search({ type: 'track', query: arg2 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(JSON.stringify(data, null, 2));
        });
        break;
    case 'movie-this':
        request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("The movie's title is: " + JSON.parse(body).Title);
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("The movie's actors are: " + JSON.parse(body).Actors);
                console.log("The movie's rottentomatoes rating is: " + JSON.stringify(JSON.parse(body).Ratings));
                console.log("The country in which the movie was produced in was: " + JSON.parse(body).Country);
                console.log("The movie was released in these languages: " + JSON.parse(body).Language);
                console.log("The movie's plot is: " + JSON.parse(body).Plot);
                console.log("The movie was released in: " + JSON.parse(body).Year);
            }
        });
        break;
    case 'do-what-it-says':
        fs.readFile("random.txt", "utf8", function(error, data) {

            if (error) {
                return console.log(error);
            }

            console.log(data);

            const dataArr = data.split(",");

            arg1 = dataArr[0];
            arg2 = dataArr[1];

            switch (arg1) {
                case 'my-tweets':
                    client.get('statuses/home_timeline', function(error, tweets, response) {
                        if (error) throw error;
                        console.log(tweets);
                    });
                case 'spotify-this-song':
                    spotify.search({ type: 'track', query: arg2 }, function(err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        console.log(JSON.stringify(data, null, 2));
                    });
                case 'movie-this':
                    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            console.log("The movie's title is: " + JSON.parse(body).Title);
                            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                            console.log("The movie's actors are: " + JSON.parse(body).Actors);
                            console.log("The movie's rottentomatoes rating is: " + JSON.stringify(JSON.parse(body).Ratings));
                            console.log("The country in which the movie was produced in was: " + JSON.parse(body).Country);
                            console.log("The movie was released in these languages: " + JSON.parse(body).Language);
                            console.log("The movie's plot is: " + JSON.parse(body).Plot);
                            console.log("The movie was released in: " + JSON.parse(body).Year);
                        }
                    });
            }
        });
        break;
}