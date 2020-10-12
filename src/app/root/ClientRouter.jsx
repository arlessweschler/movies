import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'app_root/routing/routes';
import history from 'app_history';
import store from 'redux_store';

const ClientRouter = () => {
  return (
    <Router history={history}>
      {renderRoutes(routes, { store })}
    </Router>
  );
};

export default ClientRouter;