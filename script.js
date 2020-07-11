//Starting URL's for the API's. Search parameters to be added based on user choice.
// var movieURL = "http://www.omdbapi.com/?i=tt3896198&apikey=880239c1";
var movieURL = "http://www.omdbapi.com/?i=tt3896198&apikey=a55df557";
var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

//Search through movies in for loop - if genre = BLAH then print

//This function will be fed the user's choice from the dropdown list and return an array
//that contains the names of the liquor and movie genre that corresponds to that mood.
function delegateUserInput(mood) {
  //this array variable will store 2 values: the liquor and movie genre that matches the mood selected by the user
  var pairings = [];

  //these if else statements push the liquor/genre corresponding to the given mood
  if (mood === "happy") {
    pairings.push("comedy");
    pairings.push("tequila");
    liquor = "tequila";
  } else if (mood === "sad") {
    pairings.push("drama");
    pairings.push("wine");
  }
  // else if (mood === "scared") {
  //   pairings.push("horror");
  //   pairings.push("rum");
  // }
  else if (mood === "romantic") {
    pairings.push("romantic comedy");
    pairings.push("champagne");
  } else {
    pairings.push("action");
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
function cocktailPair(apiUrl, array) {
  
  var liquor = array[1];
//ajax call retrieves the information from the cocktailsDB API
  $.ajax({
    url: apiUrl,
    method: "GET",
  }).then(function (response) {
    //variables created to store information on the drink in html elements
    var drinkName = $("<h5>" + response.drinks[0].strDrink + "</h5>");

    var drinkImage = $("<img src='" + response.drinks[0].strDrinkThumb + "'>");
    drinkImage.attr("style", "width: 200px; height: 200px;");

    var liquorType = $("<p> Liquor Type: " + liquor + "</p>");

    //variables appended to the page in 2 different divs
    $("#drink-info").append(drinkName, liquorType);
    $("#drink-picture").append(drinkImage);
  });
}


//Takes in the completed OMDB URL and the array containing the delegated liquor and movie genre choices
//creates divs containing information and appends them to the page
// ! will add more comments when Greg is done
function moviePair(apiUrl, array) {
  var movie = array[0];

  $.ajax({
    url: apiUrl,
    method: "GET",
  }).then(function ({ Title, Poster }) {
    var movieDiv = $("<div id='movie-wrapper'>");
    var movieCard = $("<div class='card'>");

    console.log(Title, Poster);
    //!here is title var
    var movieTitle = $(`<h2>${Title}</h2>`);

    //!here is picture var
    var moviePoster = $("<img>").attr({ src: Poster, alt: Title });
    var movieImage = $("<img src='" + moviePoster + "'>");
    movieImage.attr("style", "width: 200px; height: 300px");

    movieDiv.append(movieTitle, moviePoster);   
    $("#movie").append(movieDiv);

    // $("#movie-info").append(movieTitle, liquorType);
    // $("#movie-picture").append(movieImage);
  });
}


function clear() {
  $("#drink-picture").empty();
  $("#drink-info").empty();
  $("#movie-poster").empty();
  $("#movie-info").empty();
}

//make this a function just for now to make sure it works
//!Will need to test this when HTML is ready
$("#drop-down-list").on("click", function (event) {
  //clears previous choices
  clear();

  //retrieves value from the list
  //!This only Grabs "HAPPY" since it is the first child.
  // var mood = $(this).child().child().attr("id");
  var mood = $(this).children("li").children("ul").children("li").attr("id");
  console.log(mood);
  // var mood = $("#drop-down").val();

  //chooses the liquor type and movie genre to match the mood
  var drinkAndGenre = delegateUserInput(mood);

  //feeds array holding genre and liquor type
  //calls functions to build API URL's using user specified parameters
  var drinkAPI = createDrinkAPI(drinkAndGenre);
  var movieAPI = createMovieAPI(drinkAndGenre);

  //calls functions that find movie and cocktail information and populates the page
  cocktailPair(drinkAPI, drinkAndGenre);
  moviePair(movieAPI, drinkAndGenre);
});

// !!*Try to do a random one^ so that it does not just give you the same 3
//! Make sure to take our all vars used to test functions
