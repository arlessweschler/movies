import ApiService from 'app_services/Api.service';

import {
  USERS_DATA_IS_LOADING,
  USERS_DATA_LOADING_SUCCESS,
  USERS_DATA_LOADING_ERROR,
  USERS_DATA_CLEARED,
} from './users.constants';

function clearUsers() {
  return {
    type: USERS_DATA_CLEARED
  };
}

function setError(hasErrors) {
  return {
    type: USERS_DATA_LOADING_ERROR,
    hasErrors
  };
}

function setSucces(data) {
  return {
    type: USERS_DATA_LOADING_SUCCESS,
    data
  };
}

function setLoading(isLoading) {
  return {
    type: USERS_DATA_IS_LOADING,
    isLoading
  };
}

function loadUsers() {
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
      .then(() => dispatch(setLoading(false)))
      .then(() => dispatch(setError(false)))
      .catch(({ message }) => {
        dispatch(setLoading(false));
        return dispatch(setError({ url, message }));
      });

  };
}

export {
  loadUsers,
  clearUsers
};