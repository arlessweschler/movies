import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

const actionKeys = {
  MOVIE_DETAILS: 'MOVIE_DETAILS',
  MOVIE_CREDITS: 'MOVIE_CREDITS',
  MOVIE_VIDEOS: 'MOVIE_VIDEOS',
  MOVIE_IMAGES: 'MOVIE_IMAGES',
  MOVIE_RECOMMS: 'MOVIE_RECOMMS',
  MOVIE_RESET_ALL: 'MOVIE_RESET_ALL',
};

const asyncActionMaps = {
  [actionKeys.MOVIE_DETAILS]: createActionsForAsyncAction(actionKeys.MOVIE_DETAILS),
  [actionKeys.MOVIE_CREDITS]: createActionsForAsyncAction(actionKeys.MOVIE_CREDITS),
  [actionKeys.MOVIE_VIDEOS]: createActionsForAsyncAction(actionKeys.MOVIE_VIDEOS),
  [actionKeys.MOVIE_IMAGES]: createActionsForAsyncAction(actionKeys.MOVIE_IMAGES),
  [actionKeys.MOVIE_RECOMMS]: createActionsForAsyncAction(actionKeys.MOVIE_RECOMMS)
};

const actions = {
  getDetails: (request) => createActionCreator(actionKeys.MOVIE_DETAILS, { request }),
  getCredits: (request) => createActionCreator(actionKeys.MOVIE_CREDITS, { request }),
  getVideos: (request) => createActionCreator(actionKeys.MOVIE_VIDEOS, { request }),
  getImages: (request) => createActionCreator(actionKeys.MOVIE_IMAGES, { request }),
  getRecomms: (request) => createActionCreator(actionKeys.MOVIE_RECOMMS, { request }),
  resetMovieDetails: () => createActionCreator(
    actionKeys.MOVIE_RESET_ALL,
    {
      resetList: [
        actionKeys.MOVIE_DETAILS,
        actionKeys.MOVIE_CREDITS,
        actionKeys.MOVIE_VIDEOS,
        actionKeys.MOVIE_IMAGES,
        actionKeys.MOVIE_RECOMMS
      ]
    }
  )
};

export {
  actionKeys,
  asyncActionMaps
};

export const {
  getDetails,
  getCredits,
  getVideos,
  getImages,
  getRecomms,
  resetMovieDetails
} = actions;