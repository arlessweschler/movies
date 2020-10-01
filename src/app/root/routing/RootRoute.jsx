import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { Layout } from 'app_components/layout';
import { configureStore } from 'redux_store';


let initialState = {};

if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
	initialState = window.__PRELOADED_STATE__;
}

console.log('src/app/root/RootRoute.jsx, initialState:', initialState);

const store = configureStore(initialState);

const RootRoute = (props) => {
  const { children, route } = props;

  return (
    <Provider store={store}>
      <Layout>
        {
          (route && route.routes)
            ? renderRoutes(route.routes)
            : children
        }
      </Layout>
    </Provider>
  );
};

export {
  RootRoute,
  store
};