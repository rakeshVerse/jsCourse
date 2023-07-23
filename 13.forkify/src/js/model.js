import { getJSON } from './helpers.js';
import { API_URL, RES_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    resultsPerPage: RES_PER_PAGE,
    currentPage: 1,
    results: [],
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      title: recipe.title,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };

    if (state.bookmarks.some(rec => rec.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServing) {
  // Update quantity for each ingrediant
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (newServing / state.recipe.servings) * ing.quantity;
  });

  // Update serving
  state.recipe.servings = newServing;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark to bookmarks[]
  state.bookmarks.push(recipe);

  // Mark recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Store bookmark in local storage
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Remove recipe from bookmarks[]
  const index = state.bookmarks.findIndex(rec => rec.id === id);
  state.bookmarks.splice(index, 1);

  // Mark recipe as bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // Store bookmark in local storage
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
console.log(state.bookmarks);
