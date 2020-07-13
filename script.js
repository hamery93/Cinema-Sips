//Starting URL's for the API's. Search parameters to be added based on user choice.
var movieURL = "https://api.themoviedb.org/3/discover/movie?api_key=5e90ef02ac18551f90f8c1c7cf3f5e91&language=en-US&with_genres="
var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

//Search through movies in for loop - if genre = BLAH then print

//This function will be fed the user's choice from the dropdown list and return an array
//that contains the names of the liquor and movie genre that corresponds to that mood.
function delegateUserInput(mood) {
  //this array variable will store 2 values: the liquor and movie genre that matches the mood selected by the user
  var pairings = [];

  //these if else statements push the liquor/genre corresponding to the given mood
  if (mood === "happy") {
    // pairings.push("comedy");
    pairings.push("35");
    pairings.push("tequila");
    liquor = "tequila";
  } else if (mood === "sad") {
    // pairings.push("drama");
    pairings.push("18");
    pairings.push("wine");
  }
  else if (mood === "scared") {
    // pairings.push("horror");
    pairings.push("27");
    pairings.push("rum");
  }
  else if (mood === "romantic") {
    // pairings.push("romantic comedy");
    pairings.push("10749");
    pairings.push("champagne");
  } else {
    // pairings.push("action");
    pairings.push("28");
    pairings.push("whisky");
  }
  //returns the array when this function is called
  return pairings;
}

//takes in an array containing liquor and movie genre strings.
//returns a complete api url for the cocktailsDB API.
function createDrinkAPI(array) {
  // appends cocktailURL declared above with the liquor designated by user's mood choice and returns the completed string.
  return cocktailURL + array[1];
}

//takes in an array containing liquor and movie genre strings.
//returns a complete api url for the omdb API.
function createMovieAPI(array) {
  // appends movieURL declared above with the genre designated by user's mood choice and returns the completed string.
  return movieURL + array[0];
}

//Takes in the completed cocktailDB URL and the array containing the delegated liquor and movie genre choices
//creates divs containing information and appends them to the page
function cocktailPair(apiUrl, array, i) {
  
  var liquor = array[1];
//ajax call retrieves the information from the cocktailsDB API
  $.ajax({
    url: apiUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //variables created to store information on the drink in html elements
    var pictureDiv = $("<div class='basic-card-image text-center'>");
    var infoDiv = $("<div class ='basic-card-content content callout secondary' id='drink-paragraph'>");

    var drinkName = $("<h5>" + response.drinks[i].strDrink + "</h5>");

    var drinkImage = $("<img src='" + response.drinks[i].strDrinkThumb + "'>");
    drinkImage.attr("style", "width: 200px; height: 200px;");

    var liquorType = $("<p> Liquor Type: " + liquor + "</p>");

    pictureDiv.append(drinkImage);
    infoDiv.append(drinkName, liquorType);

    //divs appended to the page
    $("#cocktail-card").append(pictureDiv, infoDiv);
  });
}

function moviePair(apiUrl, i) {

//ajax call retrieves the information from the cocktailsDB API
  $.ajax({
    url: apiUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //variables created to store information on the drink in html elements
    var pictureDiv = $("<div class='basic-card-image text-center'>");
    var infoDiv = $("<div class ='basic-card-content content callout secondary' id='movie-paragraph'>");

    var movieName = $("<h5>" + response.results[i].title + "</h5>");

    var movieImage = $("<img src='http://image.tmdb.org/t/p/w185//" + response.results[i].poster_path + "'>");
    movieImage.attr("style", "width: 200px; height: 300px;");

    var moviePlot = $("<p>" + response.results[i].overview + "</p>");

    pictureDiv.append(movieImage);
    infoDiv.append(movieName, moviePlot);

   //divs appended to the page 
    $("#movie-card").append(pictureDiv, infoDiv);


  });
}

function clear() {
  $("#cocktail-card").empty();
  $("#movie-card").empty();
}

function buttonClick(event) {
   //clears previous choices
   clear();

   //retrieves value from the list

   var mood = $(this).attr("id");
 
   //chooses the liquor type and movie genre to match the mood
   var drinkAndGenre = delegateUserInput(mood);
 
   //feeds array holding genre and liquor type
   //calls functions to build API URL's using user specified parameters
   var drinkAPI = createDrinkAPI(drinkAndGenre);
   var movieAPI = createMovieAPI(drinkAndGenre);
   
   //calls functions that find movie and cocktail information and populates the page
   //loops through 3 times to do 3 movies and 3 drinks
   for(var i = 0; i < 3; i++){
     cocktailPair(drinkAPI, drinkAndGenre, i);
     moviePair(movieAPI, i);
   }
}

//sets a click event for each possible mood
$("#happy").on("click", buttonClick);
$("#sad").on("click", buttonClick);
$("#angry").on("click", buttonClick);
$("#scared").on("click", buttonClick);
$("#romantic").on("click", buttonClick);

// !!*Try to do a random one^ so that it does not just give you the same 3
