import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

export const actionKeys = {
  GET_MOVIES: 'GET_MOVIES',
  GET_GENRES: 'GET_GENRES'
};

export const asyncActionMaps = {
  [actionKeys.GET_MOVIES]: createActionsForAsyncAction(actionKeys.GET_MOVIES),
  [actionKeys.GET_GENRES]: createActionsForAsyncAction(actionKeys.GET_GENRES)
};

const actions = {
  getMovies: ({ page, moviesType, lng }) => {
    return createActionCreator(
      actionKeys.GET_MOVIES,
      { page, moviesType, lng }
    );
  },
  getGenres: () => {
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