import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';


import routes from 'async_routes';
import { history } from 'redux_store';
import Layout from 'app_components/layout/layout/Layout';

console.log('-- AppAsyncRouter');

const AppAsyncRouter = () => {
  return (
    <Router history={history}>
      <Layout>
        {renderRoutes(routes)}
      </Layout>
    </Router>
  );
};

export default AppAsyncRouter;