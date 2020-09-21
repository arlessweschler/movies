import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import { createLogger } from 'redux-logger';


const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

let middlewares = [logger];

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
  configureStore
};