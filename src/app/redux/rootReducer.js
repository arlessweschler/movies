import { combineReducers } from 'redux';

import {
  usersList
} from './users-list/users-list.reducer';

import {
  userDetails
} from './user-details/user-details.reducer';


export default combineReducers({
  usersList,
  userDetails
});