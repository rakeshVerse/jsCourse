'use strict';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/actual'; // polyfill
import 'regenerator-runtime/runtime.js'; // polyfill Async/Await

/////////////////////////////////////////////////////

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

// Subscriber
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();

///////////////////////////////////////////////////////
