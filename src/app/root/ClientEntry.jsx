import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'app_root/routing/routes';
import { configureStore } from 'redux_store';
import history from 'app_history';
import { watchMovieBrowser } from "app_redux/movies-saga/movies-saga.sagas";

let initialState = window.__PRELOADED_STATE__
  ? window.__PRELOADED_STATE__
  : {};

const store = configureStore(initialState);
store.runSaga(watchMovieBrowser);

const ClientEntry = () => {
  return (
    <Router history={history}>
      {renderRoutes(routes, { store })}
    </Router>
  );
};

export default ClientEntry;