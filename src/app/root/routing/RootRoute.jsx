import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { Layout } from 'app_components/layout';
import { store, history } from 'redux_store';
import { isClient } from 'app_services/Utils.service';

const RootRoute = (props) => {
  const { route, history: staticHistory } = props;
  const currentRoute = isClient()
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

export default RootRoute;