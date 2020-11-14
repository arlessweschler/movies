import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from 'redux_reducers';
import SagaManager from 'app_redux/sagas/SagaManager';

const IS_CLIENT = (typeof window !== 'undefined');

function configureStore(initialState = {}, startSagas = false) {
  const sagaMiddleware = createSagaMiddleware();

  const logger = createLogger({
    level: {
      prevState: IS_CLIENT ? 'log' : false,
      action: 'log',
      nextState: IS_CLIENT ? 'log' : false
    },
    collapsed: (getState, action, logEntry) => !logEntry.error
  });

  const middlewares = [sagaMiddleware, logger];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      composeWithDevTools(applyMiddleware(...middlewares))
    )
  );

  // required for SSR fetching data
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (startSagas) {
    SagaManager.startSagas(sagaMiddleware);
  }

  // HMR for reducers and sagas
  /* eslint-disable global-require */
  if (process.env.IS_DEV && module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('./sagas/SagaManager', () => {
      SagaManager.cancelSagas(store);
      require('./sagas/SagaManager').default.startSagas(sagaMiddleware);
    });
  }
  /* eslint-enable global-require */

  return store;
}

/* eslint-disable no-underscore-dangle */
const initialState = (IS_CLIENT && window.__PRELOADED_STATE__)
  ? window.__PRELOADED_STATE__
  : {};
/* eslint-enable no-underscore-dangle */

export {
  configureStore
};

// exporting created store is required for correct client-redering HMR
export default configureStore(
  initialState,
  true
);