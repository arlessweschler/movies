import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { Layout } from 'app_components/layout';
import { configureStore, history } from 'redux_store';
import { isClient } from 'app_services/Utils.service';
import { watchMovieBrowser } from "app_redux/movies-list-saga/movies-list-saga.sagas";


let initialState = (isClient() && window.__PRELOADED_STATE__)
  ? window.__PRELOADED_STATE__
  : {};

let store = configureStore(initialState);
store.runSaga(watchMovieBrowser);

const RootRoute = (props) => {
  const { route, serverStore, history: staticHistory } = props;

  const currentRoute = isClient()
    ? history.location.pathname
    : staticHistory.location.pathname;

  serverStore && (store = serverStore);

  return (
    <Provider store={store}>
      <Layout currentRoute={currentRoute}>
        {renderRoutes(route.routes)}
      </Layout>
    </Provider>
  );
};

export default RootRoute;