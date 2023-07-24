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

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
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

const controlPagination = function (page) {
  // Render NEW Search Results
  resultsView.render(model.getSearchResultsPage(page));

  // Render NEW Pagination Buttons
  paginationView.render(model.state.search);
};

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

const controlBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.render(model.state.recipe);

  // Render bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlPersistBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

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

const init = function () {
  // Subscribers
  bookmarksView.addHandlerPersistBookmarks(controlPersistBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
