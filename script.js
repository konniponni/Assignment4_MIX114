/*
Mapping from MealDB Categories to TheCocktailDB drink ingredient
You can customize or expand this object to suit your needs.
*/
const mealCategoryToCocktailIngredient = {
  Beef: "whiskey",
  Chicken: "gin",
  Dessert: "amaretto",
  Lamb: "vodka",
  Miscellaneous: "vodka",
  Pasta: "tequila",
  Pork: "tequila",
  Seafood: "rum",
  Side: "brandy",
  Starter: "rum",
  Vegetarian: "gin",
  Breakfast: "vodka",
  Goat: "whiskey",
  Vegan: "rum",
  // Add more if needed; otherwise default to something like 'cola'
};

/*
    2) Main Initialization Function
       Called on page load to start all the requests:
       - Fetch random meal
       - Display meal
       - Map meal category to spirit
       - Fetch matching (or random) cocktail
       - Display cocktail
*/
function init() {
  fetchRandomMeal()
    .then((meal) => {
      displayMealData(meal);
      const spirit = mapMealCategoryToDrinkIngredient(meal.strCategory);
      return fetchCocktailByDrinkIngredient(spirit);
    })
    .then((cocktail) => {
      displayCocktailData(cocktail);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/*
 Fetch a Random Meal from TheMealDB
 Returns a Promise that resolves with the meal object
 */
function fetchRandomMeal() {
    var TheMealDB_URL = "https://www.themealdb.com/api/json/v1/1/random.php"; //Lager en variabel med URL til TheMealDB APIet

    return fetch(TheMealDB_URL) //sender en forespørsel til APIet og returnerer en Promise
    .then(response => response.json()) //konverterer responsen til JavaScript-data
    .then(data => { 
      console.log(data); //Skriver hele dataten til konsollen

    const meal = data.meals[0]; //lager en variabel meal som inneholder det første måltiden i arrayen data.meals
    return meal; //returnerer meal-objektet
  });
}

/*
Display Meal Data in the DOM
Receives a meal object with fields like:
  strMeal, strMealThumb, strCategory, strInstructions,
  strIngredientX, strMeasureX, etc.
*/
function displayMealData(meal) {
    const container = document.getElementById("meal-container"); //Henter elementet med id "meal-container" og lagrer det i variabelen container

    let ingredientsList = ""; //Lager en tom string til ingredienslisten

    for (let i = 1; i<= 20; i++) { //itererer fra 1 til 20 for å hente ingrediensene og målene
      const ingredient = meal["strIngredient" + i]; //Henter ingrediensnavnet fra meal objektet
      const measure = meal["strMeasure" + i]; //Henter målet for ingrediensen 

      if (ingredient && ingredient.trim() !== "") { //Sjekker om ingrediensen finnes, trim hopper over tomme felt
        ingredientsList += "<li>" + measure + " " + ingredient + "</li>"; //Legger til ingrediensen og målet i ingredienslisten som et listeobjekt
      }
    }

    //Setter inn HTML-koden i container-elementet for å vise måltidets navn, bilde, kategori, instruksjoner og ingredienser
    //brukte template literals for å gjøre det enklere og ryddigere
    container.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:300px;">
      <h3>Category: ${meal.strCategory}</h3>
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
      <h3>Ingredients:</h3>
      <ul>${ingredientsList}</ul>
    `; 
}

/*
Convert MealDB Category to a TheCocktailDB Spirit
Looks up category in our map, or defaults to 'cola'
*/
function mapMealCategoryToDrinkIngredient(category) {
  if (!category) return "cola";
  return mealCategoryToCocktailIngredient[category] || "cola";
}

/*
Fetch a Cocktail Using a Spirit from TheCocktailDB
Returns Promise that resolves to cocktail object
We call https://www.thecocktaildb.com/api/json/v1/1/search.php?s=DRINK_INGREDIENT to get a list of cocktails
Don't forget encodeURIComponent()
If no cocktails found, fetch random
*/
function fetchCocktailByDrinkIngredient(drinkIngredient) {
    // Fill in
}

/*
Fetch a Random Cocktail (backup in case nothing is found by the search)
Returns a Promise that resolves to cocktail object
*/
function fetchRandomCocktail() {
    // Fill in
}

/*
Display Cocktail Data in the DOM
*/
function displayCocktailData(cocktail) {
    // Fill in
}

/*
Call init() when the page loads
*/
window.onload = init;
