import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'app_routing/routes';
import history from 'app_history';
import store from 'redux_store';

const ClientRouter = () => (
  <Router history={history}>
    {renderRoutes(routes, { store })}
  </Router>
);

export default ClientRouter;