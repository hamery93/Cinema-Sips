var movieURL = "http://www.omdbapi.com/?i=tt3896198&apikey=880239c1"
var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="


//Search through movies in for loop - if genre = BLAH then print
// Pseudo Code

// Get API URL and keys

// get user input from dropdown list

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
console.log("test");

$.ajax({
    url: cocktailURL,
    method: "GET"
}).then(function(response){
    console.log(response)
})
