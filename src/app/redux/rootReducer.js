import { combineReducers } from 'redux';

import {
  redirect
} from './common/redirect/redirect.reducer';

import {
  usersList
} from './users-list/users-list.reducer';

import {
  userDetails
} from './user-details/user-details.reducer';


export default combineReducers({
  redirect,
  usersList,
  userDetails
});