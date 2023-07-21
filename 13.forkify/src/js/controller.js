'use strict';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from 'url:../img/icons.svg'; // icons
import 'core-js/actual'; // polyfill
import 'regenerator-runtime/runtime.js'; // polyfill Async/Await

/////////////////////////////////////////////////////

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1. Load Recipe
    await model.loadRecipe(id);

    // 2. Render Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error.message);
  }
};

////////////////////////////////////////////////////////

// Event Listeners
// Show recipe on hashchange and page load
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

///////////////////////////////////////////////////////
