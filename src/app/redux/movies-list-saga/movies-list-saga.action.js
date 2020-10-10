import {
  createActionCreator,
  createActionsForAsyncAction
} from "app_redux/redux";

console.warn('-- movies-list-saga.action.js, actionKeys {}');
export const actionKeys = {
  GET_MOVIES: 'GET_MOVIES',
  GET_GENRES: 'GET_GENRES'
};

console.warn('-- movies-list-saga.action.js, asyncActionMaps {}');
export const asyncActionMaps = {
  [actionKeys.GET_MOVIES]: createActionsForAsyncAction(actionKeys.GET_MOVIES),
  [actionKeys.GET_GENRES]: createActionsForAsyncAction(actionKeys.GET_GENRES)
};

const actions = {
  getMovies: ({ page, moviesType }) => {
    console.warn('-- movies-list-saga.action.js, getMovies()');
    return createActionCreator(actionKeys.GET_MOVIES, { page, moviesType })
  },
  getGenres: () => {
    console.warn('-- movies-list-saga.action.js, getGenres()');
    return createActionCreator(actionKeys.GET_GENRES)
  }
};

const getMovies = actions.getMovies;
const getGenres = actions.getGenres;

export default actions;

export {
  getMovies,
  getGenres
};