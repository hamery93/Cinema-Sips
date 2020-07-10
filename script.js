var movieURL = "http://www.omdbapi.com/?i=tt3896198&apikey=880239c1"
var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

//Search through movies in for loop - if genre = BLAH then print

//This function will be fed the user's choice from the dropdown list and return an array
//that contains the names of the liquor and movie genre that corresponds to that mood.
//*this one should be good
function delegateUserInput(mood) {
    var pairings = [];
  
    if (mood === "happy") {
      pairings.push("comedy");
      pairings.push("tequila");
      liquor = "tequila";
    } else if (mood === "sad") {
      pairings.push("drama");
      pairings.push("wine");
    } else if (mood === "scared") {
      pairings.push("horror");
      pairings.push("rum");
    } else if (mood === "romantic") {
      pairings.push("romantic comedy");
      pairings.push("champagne");
    } else {
      pairings.push("action");
      pairings.push("whisky");
    }
   return pairings;
  }

  function createDrinkAPI(array){
  // ! I repeat this function call alot
  var delegatedArray = delegateUserInput();
  var cocktailAPI = cocktailURL + delegatedArray[1];
  return cocktailAPI;
  }

  function creteMovieAPI(array){
    var delegatedArray = delegateUserInput();
    var cocktailAPI = cocktailURL + delegatedArray[1];
    return cocktailAPI;
    }

function cocktailPair(apiUrl){
    //!This was only for testing. will need user delegated liquor
    var liquor = "Whiskey";

    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function(response){


        var drinkName = $("<h5>" + response.drinks[0].strDrink + "</h5>");


        var drinkImage = $("<img src='" + response.drinks[0].strDrinkThumb + "'>");
        drinkImage.attr("style", "width: 200px; height: 200px;");
        
        var liquorType = $("<p> Liquor Type: " + liquor + "</p>");
        
        $("#drink-info").append(drinkName, liquorType);
        $("#drink-picture").append(drinkImage);
 
    })
}


function moviePair(apiUrl){
  var movie = "action";

  $.ajax({
    url: apiUrl, 
    method: "GET"
  }).then(function({Title, Poster}){
    var movieDiv = $("<div id='movie-wrapper'>");
    var movieCard = $("<div class='card'>");

    console.log(Title, Poster);
    var movieTitle = $(`<h2>${Title}</h2>`)
    // var movieTitle = "Title: " + movieTitle;

    var moviePoster = $("<img>").attr({ "src": Poster, "alt": Title });
    var movieImage = $("<img src='" + moviePoster + "'>");
    movieImage.attr("style", "width: 200px; height: 200px");

    movieDiv.append( movieTitle, moviePoster);
    // movieDiv.append(movieCard);
    $("#movie").append(movieDiv);
  
  }) 
}


function clear(){
  $("#drink-picture").empty();
  $("#drink-info").empty();
  $("#movie-poster").empty();
  $("#movie-info").empty();
}

//make this a function just for now to make sure it works
function buttonClick(){
//clears previous choices
clear();

//retrieves value from the drop down list
//!change name based on ID
var mood = $("#drop-down").val();

//chooses the liquor type and movie genre to match the mood
var drinkAndGenre = delegateUserInput(mood);

//feeds array holding genre and liquor type
//calls functions to build API URL's using user specified parameters
var drinkAPI = createDrinkAPI(drinkAndGenre);
var movieAPI = createMovieAPI(drinkAndGenre);

//calls functions that find movie and cocktail information and populates the page
cocktailPair(drinkAPI);
moviePair(movieAPI);
}


// !!*Try to do a random one^ so that it does not just give you the same 3 
