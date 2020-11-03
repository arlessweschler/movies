import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

export const actionKeys = {
  MOVIE_DETAILS: 'MOVIE_DETAILS',
  MOVIE_CREDITS: 'MOVIE_CREDITS',
  MOVIE_VIDEOS: 'MOVIE_VIDEOS',
  MOVIE_IMAGES: 'MOVIE_IMAGES',
  MOVIE_RECOMMENDATIONS: 'MOVIE_RECOMMENDATIONS',
  RESET_MOVIE_CARD: 'RESET_MOVIE_CARD',
};

export const asyncActionMaps = {
  [actionKeys.MOVIE_DETAILS]: createActionsForAsyncAction(actionKeys.MOVIE_DETAILS),
  [actionKeys.MOVIE_CREDITS]: createActionsForAsyncAction(actionKeys.MOVIE_CREDITS),
  [actionKeys.MOVIE_VIDEOS]: createActionsForAsyncAction(actionKeys.MOVIE_VIDEOS),
  [actionKeys.MOVIE_IMAGES]: createActionsForAsyncAction(actionKeys.MOVIE_IMAGES),
  [actionKeys.MOVIE_RECOMMENDATIONS]: createActionsForAsyncAction(actionKeys.MOVIE_RECOMMENDATIONS)
};

const actions = {
  getMovieDetails: (request) => {
    const actions = asyncActionMaps[actionKeys.MOVIE_DETAILS];
    return actions.start(request);
  },
  getCredits: (request) => {
    const actions = asyncActionMaps[actionKeys.MOVIE_CREDITS];
    return actions.start(request);
  },
  getVideos: (request) => {
    const actions = asyncActionMaps[actionKeys.MOVIE_VIDEOS];
    return actions.start(request);
  },
  getImages: (request) => {
    const actions = asyncActionMaps[actionKeys.MOVIE_IMAGES];
    return actions.start(request);
  },
  getRecommendations: (request) => {
    const actions = asyncActionMaps[actionKeys.MOVIE_RECOMMENDATIONS];
    return actions.start(request);
  },
  resetMovieDetails: () => {
    return createActionCreator(
      actionKeys.RESET_MOVIE_CARD,
      {
        resetList: [
          actionKeys.MOVIE_DETAILS,
          actionKeys.MOVIE_CREDITS,
          actionKeys.MOVIE_VIDEOS,
          actionKeys.MOVIE_IMAGES,
          actionKeys.MOVIE_RECOMMENDATIONS
        ]
      }
    )
  }
};

export const {
  getMovieDetails,
  getCredits,
  getVideos,
  getImages,
  getRecommendations,
  resetMovieDetails
} = actions;