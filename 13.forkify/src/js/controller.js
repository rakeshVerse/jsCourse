'use strict';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/actual'; // polyfill
import 'regenerator-runtime/runtime.js'; // polyfill Async/Await

if (module.hot) {
  module.hot.accept();
}

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

    // Load Search Results
    await model.loadSearchResults(query);

    // Render Search Results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////

const init = function () {
  // Subscribers
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

///////////////////////////////////////////////////////
