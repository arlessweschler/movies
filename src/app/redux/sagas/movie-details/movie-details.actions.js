import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

console.warn('-- sagas/movie-details/movie-details.actions.js, actionKeys {}');
export const actionKeys = {
  MOVIE_DETAILS: 'MOVIE_DETAILS',
  MOVIE_CREDITS: 'MOVIE_CREDITS',
  MOVIE_VIDEOS: 'MOVIE_VIDEOS',
  RESET_MOVIE_CARD: 'RESET_MOVIE_CARD',
};

console.warn('-- sagas/movie-details/movie-details.actions.js, asyncActionMaps {}');
export const asyncActionMaps = {
  [actionKeys.MOVIE_DETAILS]: createActionsForAsyncAction(actionKeys.MOVIE_DETAILS),
  [actionKeys.MOVIE_CREDITS]: createActionsForAsyncAction(actionKeys.MOVIE_CREDITS),
  [actionKeys.MOVIE_VIDEOS]: createActionsForAsyncAction(actionKeys.MOVIE_VIDEOS)
};

const actions = {
  getMovieDetails: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getMovieDetails()');
    return createActionCreator(actionKeys.MOVIE_DETAILS, { movieId })
  },
  getCredits: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getCredits()');
    return createActionCreator(actionKeys.MOVIE_CREDITS, { movieId })
  },
  getVideos: (movieId) => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, getVideos()');
    return createActionCreator(actionKeys.MOVIE_VIDEOS, { movieId })
  },
  resetMovieDetails: () => {
    console.warn('-- sagas/movie-м/movie-details.actions.js, resetMovieDetails()');
    return createActionCreator(
      actionKeys.RESET_MOVIE_CARD,
      {
        resetList: [
          actionKeys.MOVIE_DETAILS,
          actionKeys.MOVIE_CREDITS,
          actionKeys.MOVIE_VIDEOS
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