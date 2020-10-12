import ApiService from 'app_services/ApiService';

import {
  USER_DETAILS_IS_LOADING,
  USER_DETAILS_LOADING_SUCCESS,
  USER_DETAILS_LOADING_ERROR,
  USER_DETAILS_CLEARED,
} from './user-details.constants';

function clearUserDetails() {
  return {
    type: USER_DETAILS_CLEARED
  };
}

function setError(hasErrors) {
  return {
    type: USER_DETAILS_LOADING_ERROR,
    isLoading: false,
    hasErrors
  };
}

function setSucces(data) {
  return {
    type: USER_DETAILS_LOADING_SUCCESS,
    dataWasFetched: true,
    isLoading: false,
    hasErrors: false,
    data
  };
}

function setLoading(isLoading) {
  return {
    type: USER_DETAILS_IS_LOADING,
    isLoading
  };
}

function loadUserDetails(user_id) {
  return (dispatch) => {
    const url = `/users/${user_id}`;
    dispatch(setLoading(true));
    return ApiService.fetch({ url })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(({ data }) => dispatch(setSucces(data)))
      .catch(({ message }) => {
        return dispatch(setError({ url, message }));
      });


  };
}

export {
  loadUserDetails,
  clearUserDetails
};