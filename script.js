var movieURL = "http://www.omdbapi.com/?i=tt3896198&apikey=880239c1"
var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var userChoice = $("#drop-down").val();


//Search through movies in for loop - if genre = BLAH then print

//This function will grab the user's choice from the dropdown list and return an array
//that contains the names of the liquor and movie genre that corresponds to that mood.
function delegateUserInput() {
    var pairings = [];
    //! ID name will depend on what they name the dropdown list in the HTML
  
    if (userChoice === "happy") {
      pairings.push("comedy");
      pairings.push("tequila");
      liquor = "tequila";
    } else if (userChoice === "sad") {
      pairings.push("drama");
      pairings.push("wine");
    } else if (userChoice === "scared") {
      pairings.push("horror");
      pairings.push("rum");
    } else if (userChoice === "romantic") {
      pairings.push("romantic comedy");
      pairings.push("champagne");
    } else {
      pairings.push("action");
      pairings.push("whisky");
    }
   return pairings;
  }

  function cocktailAPI(){
  // ! I repeat this function call alot
  var delegatedArray = delegateUserInput();
  var cocktailAPI = cocktailURL + delegatedArray[1];
  return cocktailAPI;
  }

  function movieAPI(){
    var delegatedArray = delegateUserInput();
    var cocktailAPI = cocktailURL + delegatedArray[1];
    return cocktailAPI;
    }

//! Make sure to pull from the array in delegateUserInput
//! Will need to make prettier
function cocktailPair(){
    //!This was only for testing. will need user delegated liquor
    var liquor = "Whiskey";

    $.ajax({
        url: cocktailAPI(),
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
cocktailPair();

$.ajax({
  url: movieURL + "action",
  method: "GET"
}).then(function(response){
  console.log(response)
})

//*^ For this put picture vs. text in their own divs before putting in the card^^


//*This is done for cocktail
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
console.log("test");
