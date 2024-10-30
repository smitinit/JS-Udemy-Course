//---------------------BABEL SHIT---------------------

import 'core-js/stable'; //polyFilling
import 'regenerator-runtime/runtime';

//----------------------------------------------------

//----------------------Imports-----------------------

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';

//----------------------------------------------------

// const recipeContainer = document.querySelector('.recipe');

// Main Control
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // Guard

    recipeView.loadingSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError`Something went Wrong!! <br />${err
      .toString()
      .replace('Error:', '')}`;
  }
};

const controlSearch = async function () {
  try {
    resultView.loadingSpinner();
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. load and render search query
    await model.searchRecipe(query);
  } catch (error) {
    console.log(error);
  }
};

// *Start Application
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearch);
};
init();
