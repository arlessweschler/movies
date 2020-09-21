import {
  USERS_DATA_LOADED,
  USERS_DATA_CLEARED
} from './users.constants';


const defaultUsers = {
  list: []
};

function users(state = defaultUsers, action) {
  switch (action.type) {
    case USERS_DATA_LOADED:
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