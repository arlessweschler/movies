import { history } from 'redux_store';

import {
  REDIRECT
} from './redirect.constants';


function redirect({ fromURL, toURL, payload = {} }) {
  history.push(toURL);

  return {
    type: REDIRECT,
    value: {
      fromURL,
      toURL,
      payload
    }
  };
}

export {
  redirect
}