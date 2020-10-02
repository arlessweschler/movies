import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { Layout } from 'app_components/layout';
import { configureStore, history } from 'redux_store';

const IS_CLIENT = (typeof window !== 'undefined' && window.__PRELOADED_STATE__);
let initialState = IS_CLIENT
  ? initialState = window.__PRELOADED_STATE__
  : {};

const store = configureStore(initialState);

const RootRoute = (props) => {
  const { route, history: staticHistory } = props;
  const currentRoute = IS_CLIENT
    ? history.location.pathname
    : staticHistory.location.pathname;

  return (
    <Provider store={store}>
      <Layout currentRoute={currentRoute}>
        {renderRoutes(route.routes)}
      </Layout>
    </Provider>
  );
};

export {
  RootRoute,
  store
};