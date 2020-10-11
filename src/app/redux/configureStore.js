import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';


export function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  let middlewares = [
    sagaMiddleware,
    thunk,
    createLogger({
      collapsed: (getState, action, logEntry) => !logEntry.error
    })
  ];

  const rootReducer = require('redux_reducers').default;

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      composeWithDevTools(applyMiddleware(...middlewares))
    )
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}

let initialState = (typeof window !== 'undefined' && window.__PRELOADED_STATE__)
  ? window.__PRELOADED_STATE__
  : {};

export default configureStore(initialState);