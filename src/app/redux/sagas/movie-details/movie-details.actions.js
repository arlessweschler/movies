import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

console.warn('-- sagas/movie-details/movie-details.actions.js, actionKeys {}');
export const actionKeys = {
  GET_MOVIE_DETAILS: 'GET_MOVIE_DETAILS',
  GET_CREDITS: 'GET_CREDITS',
  GET_VIDEOS: 'GET_VIDEOS',
  RESET_MOVIE_DETAILS: 'RESET_MOVIE_DETAILS',
};

console.warn('-- sagas/movie-details/movie-details.actions.js, asyncActionMaps {}');
export const asyncActionMaps = {
  [actionKeys.GET_MOVIE_DETAILS]: createActionsForAsyncAction(actionKeys.GET_MOVIE_DETAILS),
  [actionKeys.GET_CREDITS]: createActionsForAsyncAction(actionKeys.GET_CREDITS),
  [actionKeys.GET_VIDEOS]: createActionsForAsyncAction(actionKeys.GET_VIDEOS)
};

const actions = {
  getMovieDetails: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getMovieDetails()');
    return createActionCreator(actionKeys.GET_MOVIE_DETAILS, { movieId })
  },
  getCredits: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getCredits()');
    return createActionCreator(actionKeys.GET_CREDITS, { movieId })
  },
  getVideos: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getVideos()');
    return createActionCreator(actionKeys.GET_VIDEOS, { movieId })
  },
  resetMovieDetails: () => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, resetMovieDetails()');
    return createActionCreator(
      actionKeys.RESET_MOVIE_DETAILS,
      {
        resetList: [
          actionKeys.GET_MOVIE_DETAILS,
          actionKeys.GET_CREDITS,
          actionKeys.GET_VIDEOS
        ]
      }
    )
  }
};

export const {
  getMovieDetails,
  getCredits,
  getVideos,
  resetMovieDetails
} = actions;