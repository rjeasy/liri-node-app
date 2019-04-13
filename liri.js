require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

console.log(moment());

function movieSearch(movieInput) {
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(response.data);
            console.log("The movie's rating is: " + response.data.imdbRating);
        }
    );
}


