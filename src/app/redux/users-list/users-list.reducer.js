import {
  USERS_LIST_IS_LOADING,
  USERS_LIST_LOADING_SUCCESS,
  USERS_LIST_LOADING_ERROR,
  USERS_LIST_CLEARED,
} from './users-list.constants';


const defaultUsersList = {
  list: [],
  listWasFetched: false,
  isLoading: false,
  hasErrors: false
};

function usersList(state = defaultUsersList, action) {
  switch (action.type) {
    case USERS_LIST_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case USERS_LIST_LOADING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        hasErrors: action.hasErrors
      };

    case USERS_LIST_LOADING_SUCCESS:
      const { list } = action.data;
      return {
        ...state,
        list,
        listWasFetched: action.listWasFetched,
        isLoading: action.isLoading,
        hasErrors: action.hasErrors
      };

    case USERS_LIST_CLEARED:
      return { ...defaultUsersList };

    default:
      return state;
  }
};

export {
  usersList
};