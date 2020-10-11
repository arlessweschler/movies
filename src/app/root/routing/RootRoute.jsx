import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { Layout } from 'app_components/layout';
import { configureStore } from 'redux_store';
import { isClient } from 'app_services/Utils.service';
import { watchMovieBrowser } from "app_redux/movies-saga/movies-saga.sagas";


let initialState = (isClient() && window.__PRELOADED_STATE__)
  ? window.__PRELOADED_STATE__
  : {};

let store = configureStore(initialState);
store.runSaga(watchMovieBrowser);

const RootRoute = (props) => {
  const { route, serverStore } = props;
  serverStore && (store = serverStore);

  return (
    <Provider store={store}>
      <Layout>
        {renderRoutes(route.routes)}
      </Layout>
    </Provider>
  );
};

export default RootRoute;