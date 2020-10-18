import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

console.warn('-- sagas/movie-details/movie-details.actions.js, actionKeys {}');
export const actionKeys = {
  GET_MOVIE_DETAILS: 'GET_MOVIE_DETAILS'
};

console.warn('-- sagas/movie-details/movie-details.actions.js, asyncActionMaps {}');
export const asyncActionMaps = {
  [actionKeys.GET_MOVIE_DETAILS]: createActionsForAsyncAction(actionKeys.GET_MOVIE_DETAILS)
};

const actions = {
  getMovieDetails: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getMovieDetails()');
    return createActionCreator(actionKeys.GET_MOVIE_DETAILS, { movieId })
  }
};

export const {
  getMovieDetails
} = actions;