'use strict';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

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

const init = function () {
  // Subscribers
  bookmarksView.addHandlerPersistBookmarks(controlPersistBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
