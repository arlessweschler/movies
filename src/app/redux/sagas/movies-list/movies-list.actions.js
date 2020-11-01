import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

export const actionKeys = {
  GET_MOVIES: 'GET_MOVIES',
  GET_GENRES: 'GET_GENRES',
  RESET_MOVIES: 'RESET_MOVIES'
};

export const asyncActionMaps = {
  [actionKeys.GET_MOVIES]: createActionsForAsyncAction(actionKeys.GET_MOVIES),
  [actionKeys.GET_GENRES]: createActionsForAsyncAction(actionKeys.GET_GENRES)
};

const actions = {
  getMovies: (params = {}) => {
    const { page, moviesType, lng, search } = params;
    return createActionCreator(
      actionKeys.GET_MOVIES,
      { page, moviesType, lng, search }
    );
  },
  getGenres: (params = {}) => {
    const { page, moviesType, lng } = params;
    return createActionCreator(actionKeys.GET_GENRES, { page, moviesType, lng })
  },
  resetMovies: () => {
    return createActionCreator(
      actionKeys.RESET_MOVIES,
      {
        resetList: [
          actionKeys.GET_MOVIES
        ]
      }
    )
  }
};

const getMovies = actions.getMovies;
const getGenres = actions.getGenres;
const resetMovies = actions.resetMovies;

export default actions;

export {
  getMovies,
  getGenres,
  resetMovies
};