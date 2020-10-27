import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

export const actionKeys = {
  MOVIE_DETAILS: 'MOVIE_DETAILS',
  MOVIE_CREDITS: 'MOVIE_CREDITS',
  MOVIE_VIDEOS: 'MOVIE_VIDEOS',
  RESET_MOVIE_CARD: 'RESET_MOVIE_CARD',
};

export const asyncActionMaps = {
  [actionKeys.MOVIE_DETAILS]: createActionsForAsyncAction(actionKeys.MOVIE_DETAILS),
  [actionKeys.MOVIE_CREDITS]: createActionsForAsyncAction(actionKeys.MOVIE_CREDITS),
  [actionKeys.MOVIE_VIDEOS]: createActionsForAsyncAction(actionKeys.MOVIE_VIDEOS)
};

const actions = {
  getMovieDetails: (movieId, params = {}) => {
    const { lng } = params;
    return createActionCreator(actionKeys.MOVIE_DETAILS, { movieId, lng });
  },
  getCredits: (movieId, params = {}) => {
    const { lng } = params;
    return createActionCreator(actionKeys.MOVIE_CREDITS, { movieId, lng })
  },
  getVideos: (movieId, params = {}) => {
    const { lng } = params;
    return createActionCreator(actionKeys.MOVIE_VIDEOS, { movieId, lng })
  },
  resetMovieDetails: () => {
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