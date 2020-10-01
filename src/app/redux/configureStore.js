import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {
  createBrowserHistory,
  createMemoryHistory
} from 'history';

let history;

// нужно для серверного рендеринга
if (typeof window !== 'undefined' && window.document) {
  history = createBrowserHistory();
} else {
  history = createMemoryHistory();
}

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

let middlewares = [thunk, logger];

const enhancer = compose(
  applyMiddleware(...middlewares)
);

const rootReducer = require('redux_reducers').default;

function configureStore(initialState = {}) {
  console.log('configureStore()');

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  return store;
}

export {
  configureStore,
  history
};