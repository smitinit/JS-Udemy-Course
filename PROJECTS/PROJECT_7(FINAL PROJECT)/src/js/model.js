import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  searchRecipe: {
    query: '',
    result: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmark: [],
};
//
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
    };

    if (state.bookmark.some(b => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    // console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};

export const searchRecipe = async function (query) {
  try {
    state.searchRecipe.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    const { recipes } = data.data;

    state.searchRecipe.result = recipes.map(r => {
      return {
        id: r.id,
        title: r.title,
        publisher: r.publisher,
        imageUrl: r.image_url,
      };
    });
    state.searchRecipe.page = 1;
    // console.log(state.searchRecipe.result);
  } catch (error) {
    throw error;
  }
};

export const pageRenderOnSearch = function (page = state.searchRecipe.page) {
  state.searchRecipe.page = page;
  const start = (page - 1) * state.searchRecipe.resultsPerPage;
  const end = page * state.searchRecipe.resultsPerPage;

  return state.searchRecipe.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmark.push(recipe);

  //Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
export const deleteBookmark = function (id) {
  // Remove bookmark
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  //Mark current recipe as not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
