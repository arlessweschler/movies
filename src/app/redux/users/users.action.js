import usersJson from 'app_data/users.json';

import {
  USERS_DATA_LOADED,
  USERS_DATA_CLEARED
} from './users.constants';


function loadUsers() {
  return {
    type: USERS_DATA_LOADED,
    data: usersJson
  };
}

function clearUsers() {
  return {
    type: USERS_DATA_CLEARED
  };
}

export {
  loadUsers,
  clearUsers
};