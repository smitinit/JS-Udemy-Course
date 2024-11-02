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
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSED_SECONDS } from './config.js';

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
    bookmarkView.update(model.state.bookmark);

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
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultView.loadingSpinner();

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

const controlAddBookmark = function () {
  // ADD REMOVE BOOKMARK
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // UPDATE
  recipeView.update(model.state.recipe);

  //RENDER
  bookmarkView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Loading
    addRecipeView.loadingSpinner();

    // Upload new Recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render Bookmark View
    bookmarkView.render(model.state.bookmark);

    // Update hash
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form
    addRecipeView.toggleWindow();
    // setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSED_SECONDS * 1000);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
};

// *Start Application
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerFormSubmit(controlAddRecipe);
};
init();
