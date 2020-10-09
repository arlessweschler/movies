import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { createBrowserHistory, createMemoryHistory } from 'history';


import { isClient } from 'app_services/Utils.service';

const history = isClient()
  ? createBrowserHistory()
  : createMemoryHistory();

export default function configureStore(initialState = {}) {
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

export {
  configureStore,
  history
};