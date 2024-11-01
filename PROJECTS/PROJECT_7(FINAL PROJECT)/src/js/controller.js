//---------------------BABEL - PARCEL -  SHIT---------------------

import 'core-js/stable'; //polyFilling
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }
//----------------------------------------------------

//----------------------Imports-----------------------

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

//----------------------------------------------------

// const recipeContainer = document.querySelector('.recipe');

// Main Control
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // Guard

    recipeView.loadingSpinner();

    // 0. Result view mark selected recipe
    resultView.update(model.pageRenderOnSearch());

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

    //3. Render result
    resultView.render(model.pageRenderOnSearch());

    //4. Render initial pagination
    paginationView.render(model.state.searchRecipe);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (gotoPage) {
  //1. Render new result
  resultView.render(model.pageRenderOnSearch(gotoPage));

  //2. Render new pagination
  paginationView.render(model.state.searchRecipe);
};

const controlServings = function (newServings) {
  //update recipe and view
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// *Start Application
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();
