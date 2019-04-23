require("dotenv").config();
var keys = require("./keys.js")
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");



var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

switch (command) {

    case 'concert-this':
        searchBandsInTown(search);
        break;

    case 'spotify-this-song':
        spotifySong(search);
        break;

    case 'movie-this':
        movieSearch(search);
        break;

    case 'do-what-it-says':
        getRandom();
        break;

}

//Function to search Bands in Town for concerts

function searchBandsInTown(artist) {

    //Returns name of venue, venue location, and Date of event with format: MM/DD/YYYY
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (concertObj) {
            var concerts = concertObj.data;

            for (let i = 0; i < concerts.length; i++) {
                console.log("Venue: " + concerts[i].venue.name);
                console.log("Location: " + concerts[i].venue.city);
                let startTime = moment(concerts[i].datetime, "YYYY-MM-DDTHH:mm:ss")
                let startTimeF = moment(startTime).format("MM/DD/YYYY")
                console.log("Date: " + startTimeF);
                console.log("--------------------------")

            }

            // console.log(concertObj);


        }
    )
}

//OMDB search for movies
function movieSearch(movieInput) {  
    
    if (movieInput === "") {
        movieInput = "Mr. Nobody";
    }
    console.log("movie input: " + movieInput);

    axios.get("http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(response.data);
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMdB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Rotten Tomatoes: " + response.data.Ratings[0].Value);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

//Function to search spotify for artist(s), songs, preview link of song, album that the song
function spotifySong(songName) {
    if (songName === undefined) {
        songName = "The Sign";
    }

    spotify.search(
        {
            type: 'track',
            query: songName
        },
        function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }

            for (var i = 0; i < data.tracks.items.length; i++) {
                var songs = data.tracks.items[i];
                console.log(i);
                console.log("artist(s): " + songs.artists[0].name);
                console.log("song name: " + songs.name);
                console.log("album: " + songs.album.name);
                if (songs.artists.preview_url) {
                    console.log("preview song: " + songs.artists.preview_url);
                } else {
                    console.log("Sorry preview song not available");
                    
                }
                console.log("-----------------------------------");
            }
        });
}


function getRandom() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
        //split text with comma delimiter
        var cmds = data.toString().split(',');
    });
}
    // var queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp";