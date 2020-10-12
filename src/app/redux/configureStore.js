import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from 'redux_reducers';
import SagaManager from 'app_redux/SagaManager';


export function configureStore(initialState = {}, startSagas = false) {
  const sagaMiddleware = createSagaMiddleware();

  let middlewares = [
    sagaMiddleware,
    thunk,
    // logger must be last
    createLogger({
      collapsed: (getState, action, logEntry) => !logEntry.error
    })
  ];

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
  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        const nextRootReducer = require('./rootReducer').default
        store.replaceReducer(nextRootReducer)
      })

      module.hot.accept('./SagaManager', () => {
        SagaManager.cancelSagas(store);
        require('./SagaManager').default.startSagas(sagaMiddleware);
      });
    }
  }

  return store;
}

let initialState = (typeof window !== 'undefined' && window.__PRELOADED_STATE__)
  ? window.__PRELOADED_STATE__
  : {};

// exporting created store is required for correct client-redering HMR
export default configureStore(
  initialState,
  true
);