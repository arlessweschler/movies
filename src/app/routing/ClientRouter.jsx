import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import history from '@/history';
import routes from '@/routing/routes';
import store from '@/redux/configureStore';

const ClientRouter = () => (
  <Router history={history}>
    {renderRoutes(routes, { store })}
  </Router>
);

export default ClientRouter;