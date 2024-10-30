import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  searchRecipe: {
    query: '',
    result: [],
  },
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

    console.log(state.searchRecipe);
  } catch (error) {
    throw error;
  }
};
