import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';


import routes from 'async_routes';
import { history } from 'redux_store';

console.log('-- AppAsyncRouter');

const AppAsyncRouter = () => {
  return (
    <Router history={history}>
        {renderRoutes(routes)}
    </Router>
  );
};

export default AppAsyncRouter;