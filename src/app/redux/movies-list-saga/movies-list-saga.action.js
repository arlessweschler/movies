import {
  createActionCreator,
  createActionsForAsyncAction
} from "app_redux/redux";

console.warn('-- movies-list-saga.action.js, actionKeys {}');

export const actionKeys = {
  GET_MOVIES: 'GET_MOVIES'
};

console.warn('-- movies-list-saga.action.js, asyncActionMaps {}');
export const asyncActionMaps = {
  [actionKeys.GET_MOVIES]: createActionsForAsyncAction(actionKeys.GET_MOVIES)
};

const actions = {
  getMovies: ({ page, moviesType }) => {
    console.warn('-- movies-list-saga.action.js, getMovies()');
    return createActionCreator(actionKeys.GET_MOVIES, { page, moviesType })
  }
};

const getMovies = actions.getMovies;

export default actions;

export {
  getMovies
};