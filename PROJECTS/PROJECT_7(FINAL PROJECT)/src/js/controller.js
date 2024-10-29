import 'core-js/stable'; //polyFilling
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

// const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

//------------------------------------------------------------

// FETCH
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard

    recipeView.loadingSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
