import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { Layout } from 'app_components/layout';

const RootRoute = (props) => {
  const { route, store } = props;

  return (
    <Provider store={store}>
      <Layout>
        {renderRoutes(route.routes)}
      </Layout>
    </Provider>
  );
};

export default RootRoute;