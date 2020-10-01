import {
  USERS_DATA_IS_LOADING,
  USERS_DATA_LOADING_SUCCESS,
  USERS_DATA_LOADING_ERROR,
  USERS_DATA_CLEARED,
} from './users.constants';


const defaultUsers = {
  list: []
};

function users(state = defaultUsers, action) {
  switch (action.type) {
    case USERS_DATA_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case USERS_DATA_LOADING_ERROR:
      return { ...state, hasErrors: action.hasErrors };

    case USERS_DATA_LOADING_SUCCESS:
      const { list } = action.data;
      return { ...state, list };

    case USERS_DATA_CLEARED:
      return { ...defaultUsers };

    default:
      return state;
  }
};

export {
  users
};