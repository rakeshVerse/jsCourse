import { AJAX } from './helpers.js';
import { API_URL, KEY, RES_PER_PAGE } from './config.js';

/**
 * Represents the application state.
 * @typedef {Object} State
 * @property {Object} recipe - The current recipe object.
 * @property {Object} search - The search-related information.
 * @property {string} search.query - The search query.
 * @property {number} search.resultsPerPage - The number of results per page in search.
 * @property {number} search.currentPage - The current page number in search results.
 * @property {Object[]} search.results - An array of search results.
 * @property {Object[]} bookmarks - An array of bookmarked recipes.
 */
export const state = {
  recipe: {},
  search: {
    query: '',
    resultsPerPage: RES_PER_PAGE,
    currentPage: 1,
    results: [],
  },
  bookmarks: [],
};

/**
 * Function to create a recipe object from the received data.
 * @param {Object} data - The data received from the API.
 * @returns {Object} - The created recipe object.
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * Loads a recipe with the specified ID and updates the application state.
 * @param {string} id - The ID of the recipe to load.
 * @throws {Error} If there is an error during the loading process.
 */
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(rec => rec.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

/**
 * Loads search results for the provided query and updates the application state.
 * @param {string} query - The search query to load results for.
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Gets a specific page of search results.
 * @param {number} [page=state.search.currentPage] - The page number to retrieve.
 * @returns {Object[]} - An array of search results for the specified page.
 */
export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

/**
 * Updates the servings of the current recipe and adjusts ingredient quantities accordingly.
 * @param {number} newServing - The new number of servings for the recipe.
 */
export const updateServings = function (newServing) {
  // Update quantity for each ingredient
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (newServing / state.recipe.servings) * ing.quantity;
  });

  // Update state
  state.recipe.servings = newServing;
};

/**
 * Stores the bookmarks array in the local storage.
 */
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * Adds a recipe to the bookmarks and stores it in local storage.
 * @param {Object} recipe - The recipe to add to bookmarks.
 */
export const addBookmark = function (recipe) {
  // Add bookmark to bookmarks[]
  state.bookmarks.push(recipe);

  // Mark recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Store bookmark in local storage
  persistBookmarks();
};

/**
 * Deletes a bookmarked recipe with the specified ID and updates the bookmarks array in local storage.
 * @param {string} id - The ID of the recipe to delete from bookmarks.
 */
export const deleteBookmark = function (id) {
  // Remove recipe from bookmarks[]
  const index = state.bookmarks.findIndex(rec => rec.id === id);
  state.bookmarks.splice(index, 1);

  // Mark recipe as bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // Store bookmark in local storage
  persistBookmarks();
};

/**
 * Adds a new recipe to the application state and bookmarks it.
 * @param {Array} newRecipe - The data for the new recipe.
 * @throws {Error} If there is an error during the creation and addition of the new recipe.
 */
export const addNewRecipe = async function (newRecipe) {
  try {
    // Format ingredients
    // prettier-ignore
    const ingredients = newRecipe.filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const ingArr = ing[1].split(',').map(ing => ing.trim());
      if (ingArr.length !== 3) throw new Error(`Wrong ingredient format! Please use the correct format:)`)
      
      const [quantity, unit, description] = ingArr
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    // Create recipe object
    const recipeObj = Object.fromEntries(newRecipe);
    const recipe = {
      id: recipeObj.id,
      publisher: recipeObj.publisher,
      ingredients: ingredients,
      source_url: recipeObj.sourceUrl,
      image_url: recipeObj.image,
      title: recipeObj.title,
      servings: +recipeObj.servings,
      cooking_time: +recipeObj.cookingTime,
    };

    // Make API call
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    // Add recipe to state
    state.recipe = createRecipeObject(data);

    // Add recipe to bookmark
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

/**
 * Initializes the application by retrieving bookmarks from local storage (if available).
 */
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
