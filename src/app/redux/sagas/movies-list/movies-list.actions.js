import {
  createActionCreator,
  createActionsForAsyncAction
} from 'app_redux/helpers/actions.helper';

const actionKeys = {
  MOVIES_LIST: 'MOVIES_LIST',
  GENRES_LIST: 'GENRES_LIST'
};

const asyncActionMaps = {
  [actionKeys.MOVIES_LIST]: createActionsForAsyncAction(actionKeys.MOVIES_LIST),
  [actionKeys.GENRES_LIST]: createActionsForAsyncAction(actionKeys.GENRES_LIST)
};

const actions = {
  getMovies: function (request) {
    return createActionCreator(actionKeys.MOVIES_LIST, { request });
  },
  getGenres: function (request) {
    return createActionCreator(actionKeys.GENRES_LIST, { request });
  },
  resetMovies: () => {
    return asyncActionMaps[actionKeys.MOVIES_LIST].reset();
  }
};

export {
  actionKeys,
  asyncActionMaps
};

export const {
  getMovies,
  getGenres,
  resetMovies
} = actions;