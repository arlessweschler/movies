import {
  REDIRECT
} from './redirect.constants';


function redirect(state = {}, action) {
  switch (action.type) {
    case REDIRECT:
      return action.value;

    default:
      return state;
  }
};

export {
  redirect
};