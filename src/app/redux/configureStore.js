import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import {
  createBrowserHistory,
  createMemoryHistory
} from 'history';

import { isClient } from 'app_services/Utils.service';

const history = isClient()
  ? createBrowserHistory()
  : createMemoryHistory();

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

let middlewares = [
  thunk,
  logger
];

const enhancer = compose(
  composeWithDevTools(applyMiddleware(...middlewares))
);

const rootReducer = require('redux_reducers').default;

function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  return store;
}

let initialState = isClient() && window.__PRELOADED_STATE__
  ? initialState = window.__PRELOADED_STATE__
  : {};

const store = configureStore(initialState);

export {
  configureStore,
  store,
  history
};