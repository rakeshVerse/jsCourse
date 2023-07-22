'use strict';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

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
  // Render Search Results
  resultsView.render(model.getSearchResultsPage(page));

  // Update Pagination Buttons
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

const init = function () {
  // Subscribers
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};

init();
