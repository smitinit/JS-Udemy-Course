//---------------------BABEL SHIT---------------------

import 'core-js/stable'; //polyFilling
import 'regenerator-runtime/runtime';

//----------------------------------------------------

//----------------------Imports-----------------------

import * as model from './model.js';
import recipeView from './views/recipeView.js';

//----------------------------------------------------

// const recipeContainer = document.querySelector('.recipe');

// Main Control
const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    id = '664c8f193e7aa067e94e845'; //temporary
    if (!id) return; // Guard

    recipeView.loadingSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError`Something went Wrong!! <br />${err
      .toString()
      .replace('Error:', '')}`();
  }
};

// *Start Application
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
