/**
 * @fileoverview Main application file.
 */

'use strict';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import { CLOSE_TIMEOUT } from './config.js';
import 'core-js/actual'; // polyfill
import 'regenerator-runtime/runtime.js'; // polyfill Async/Await

/**
 * Controller function to handle loading and rendering a recipe.
 * @async
 */
const controlRecipes = async function () {
  try {
    // Get the ID from the URL hash
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1. Load Recipe
    await model.loadRecipe(id);

    // 2. Render Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

/**
 * Controller function to handle searching for recipes.
 * @async
 */
const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // Load Search Results
    await model.loadSearchResults(query);

    // Render Search Results
    resultsView.render(model.getSearchResultsPage());

    // Render Initial Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Controller function to handle pagination.
 * @param {number} page - The page number to render.
 */
const controlPagination = function (page) {
  // Render NEW Search Results
  resultsView.render(model.getSearchResultsPage(page));

  // Render NEW Pagination Buttons
  paginationView.render(model.state.search);
};

/**
 * Controller function to handle updating recipe servings.
 * @param {number} updateTo - The number of servings to update to.
 */
const controlUpdateServings = function (updateTo) {
  try {
    // Update State
    model.updateServings(updateTo);

    // Render Updated Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Controller function to handle bookmarking a recipe.
 */
const controlBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.render(model.state.recipe);

  // Render bookmark
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Controller function to render bookmarks when the page is loaded
 */
const controlPersistBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Controller function to handle adding a new recipe.
 * @async
 * @param {Object} newRecipe - The new recipe object to be uploaded.
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload new recipe
    await model.addNewRecipe(newRecipe);

    // Success message
    addRecipeView.renderMessage();

    // Render recipe
    recipeView.render(model.state.recipe);

    // Render Bookmark
    bookmarksView.render(model.state.bookmarks);

    // Add ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close Window
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, CLOSE_TIMEOUT * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

/**
 * Initialize the application.by passing Subscribers functions as parameter to Publishers functions to handle events
 */
const init = function () {
  bookmarksView.addHandlerPersistBookmarks(controlPersistBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
