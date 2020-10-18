import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

console.warn('-- sagas/movie-details/movie-details.actions.js, actionKeys {}');
export const actionKeys = {
  GET_MOVIE_DETAILS: 'GET_MOVIE_DETAILS',
  GET_CREDITS: 'GET_CREDITS'
};

console.warn('-- sagas/movie-details/movie-details.actions.js, asyncActionMaps {}');
export const asyncActionMaps = {
  [actionKeys.GET_MOVIE_DETAILS]: createActionsForAsyncAction(actionKeys.GET_MOVIE_DETAILS),
  [actionKeys.GET_CREDITS]: createActionsForAsyncAction(actionKeys.GET_CREDITS)
};

const actions = {
  getMovieDetails: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getMovieDetails()');
    return createActionCreator(actionKeys.GET_MOVIE_DETAILS, { movieId })
  },
  getCredits: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getCredits()');
    return createActionCreator(actionKeys.GET_CREDITS, { movieId })
  }
};

export const {
  getMovieDetails,
  getCredits
} = actions;