var movieURL = "http://www.omdbapi.com/?i=tt3896198&apikey=880239c1"
var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="


//Search through movies in for loop - if genre = BLAH then print

//This function will grab the user's choice from the dropdown list and return an array
//that contains the names of the liquor and movie genre that corresponds to that mood.
function delegateUserInput() {
    var pairings = [];
    //! ID name will depend on what they name the dropdown list in the HTML
    var userChoice = $("#drop-down").val();
 
  
    if (userChoice === "happy") {
      pairings.push("comedy");
      pairings.push("tequila");
      liquor = "tequila";
    } else if (userChoice === "sad") {
      pairings.push("drama");
      pairings.push("wine");
    } else {
      pairings.push("action");
      pairings.push("whisky");
    }
   return pairings;
  }
  
  delegateUserInput();

//! Make sure to pull from the array in delegateUserInput
//! Will need to make prettier
function cocktailPair(){
    //!This was only for testing. will need user delegated liquor
    var liquor = "Whiskey";

    $.ajax({
        url: cocktailURL + liquor,
        method: "GET"
    }).then(function(response){
        var cocktailDiv = $("<div id='cocktail'>");
        var cocktailCard = $("<div class='card'>");
        
        console.log(response);
        var drinkName = response.drinks[0].strDrink;
        var drinkName = "Drink Name: " + drinkName;

        var drinkPic = response.drinks[0].strDrinkThumb;
        var cocktailImage = $("<img src='" +drinkPic + "'>");
        cocktailImage.attr("style", "width: 100px; height: 100px;");

        cocktailCard.append("Liquor Type: " + liquor, drinkName, cocktailImage);
        cocktailDiv.append(cocktailCard);
        $("#drinks").append(cocktailDiv);

    })
}

function moviePair(){
  var movie = "action";

  $.ajax({
    url: movieURL, 
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
  cocktailPair();
  moviePair();
// If statement to determine which word will be appended to url and API
// - Happy: Comedy - Tequila
//     - If happy then drink url =
//     - If happy then movie url = 
// - Sad: Drama - Wine
// - Angry: Action - Whisky

// ajax call to search for these movies + drinks: if there is an array, just go with the first one
// - create 2 divs to hold each(movie + alc) save in variable
// - Create 2 cards to hold each (movie + alc) save in variable
// - Print just 1 of each for now
// - Get from response:
//     - Movie: Title, movie poster, rating, plot
//     - Drink: Name, picture, Liquor
// - append movie things to it's card, then append card to div
// - append cocktail things to it's card, then append card to div
// - append cards to whatever section is delegated in html
// !!*Try to do a random one^ so that it does not just give you the same 3 

// clear function to clear it out whenever you make a new one.
// console.log("test");

// $.ajax({
//     url: movieURL,
//     method: "GET"
// }).then(function(response){
//     console.log(response)
// })
