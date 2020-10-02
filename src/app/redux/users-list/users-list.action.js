import ApiService from 'app_services/Api.service';

import {
  USERS_LIST_IS_LOADING,
  USERS_LIST_LOADING_SUCCESS,
  USERS_LIST_LOADING_ERROR,
  USERS_LIST_CLEARED,
} from './users-list.constants';

function clearUsersList() {
  return {
    type: USERS_LIST_CLEARED
  };
}

function setError(hasErrors) {
  return {
    type: USERS_LIST_LOADING_ERROR,
    isLoading: false,
    hasErrors
  };
}

function setSucces(data) {
  return {
    type: USERS_LIST_LOADING_SUCCESS,
    listWasFetched: true,
    isLoading: false,
    hasErrors: false,
    data
  };
}

function setLoading(isLoading) {
  return {
    type: USERS_LIST_IS_LOADING,
    isLoading
  };
}

function loadUsersList() {
  return (dispatch) => {
    const url = '/users';
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
  loadUsersList,
  clearUsersList
};