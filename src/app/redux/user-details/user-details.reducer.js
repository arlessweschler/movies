import {
  USER_DETAILS_IS_LOADING,
  USER_DETAILS_LOADING_SUCCESS,
  USER_DETAILS_LOADING_ERROR,
  USER_DETAILS_CLEARED,
} from './user-details.constants';


const defaultUserDetails = {
  data: {
    "id": "",
    "name": "",
    "surname": "",
    "details": {
      "city": "",
      "age": "",
      "ip": "",
      "registration_date": "",
      "last_visit_date": ""
    }
  },
  dataWasFetched: false,
  isLoading: false,
  hasErrors: false
};

function userDetails(state = defaultUserDetails, action) {
  switch (action.type) {
    case USER_DETAILS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case USER_DETAILS_LOADING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        hasErrors: action.hasErrors
      };

    case USER_DETAILS_LOADING_SUCCESS:
      return {
        ...state,
        data: action.data,
        dataWasFetched: action.dataWasFetched,
        isLoading: action.isLoading,
        hasErrors: action.hasErrors
      };

    case USER_DETAILS_CLEARED:
      return { ...defaultUserDetails };

    default:
      return state;
  }
};

export {
  userDetails
};