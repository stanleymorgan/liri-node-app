//get fs npm package

var fs = require("fs");
var request = require("request");
//get user's input
var input = process.argv;
var category = "";
var movieName = "";
var songName = "";
///////////////////////////////////
var category = input[2];
//if category is movie-this
if(category==="movie-this"){

	for(var i = 3; i < input.length; i++){
		if(i > 3 && i < input.length){
			movieName = movieName + "+" + input[i];
		}
		else{
			movieName += input[i];
		}
	}
	//request to OMBD API
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200){
			console.log("Movie Title:  " + JSON.parse(body).Title);
			console.log("Year Released:  " + JSON.parse(body).Year);
			console.log("Movie Rating:  " + JSON.parse(body).imdbRating);
			console.log("Country:  " + JSON.parse(body).Country);
			console.log("Movie Language:  " + JSON.parse(body).Language);
			console.log("Plot:  " + JSON.parse(body).Plot);
			console.log("Rotton Tomatoes Rating:  " + JSON.parse(body).Tomatoes);
		}
	});
}
////////if category is spotify this song
else if(category==="spotify-this-song"){
	console.log(process.argv[3]);
	songName = process.argv[3];
	
	//request to spotify
	var queryUrl = "https://api.spotify.com/v1/search?q=" + songName + "&type=track";
	console.log(queryUrl)
	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200){
			console.log("Artist:  " + JSON.parse(body).tracks.items[0].album.artists[0].name);
			console.log("Song Name:  " + JSON.parse(body).tracks.items[0].album.name);
			console.log("Preview  " + JSON.parse(body).tracks.items[0].album.artists[0].href);
			console.log("Album:  " + JSON.parse(body).tracks.items[0].album.type);
		}
	});
}
///if categotry is do-what-it-says

else if(category==="do-what-it-says"){
		var songTitle = "";
	fs.readFile("random.txt", "utf8", function(error, data){
		var dataArray = data.Split(",");
		var choice = dataArray[0];
		var songTitle = dataArray[2];
		
	});
	//request to spotify
	var queryURL = "https://api.spotify.com/v1/search?q=" + songTitle + "&type=track";
	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200){
			console.log("Artist:  " + JSON.parse(body).tracks.items[0].album.artists[0].name);
			console.log("Song Name:  " + JSON.parse(body).tracks.items[0].album.name);
			console.log("Preview  " + JSON.parse(body).tracks.items[0].album.artists[0].href);
			console.log("Album:  " + JSON.parse(body).tracks.items[0].album.type);
		}
	});
}