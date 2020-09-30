import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'app_root/routing/routes';
import { history } from 'redux_store';

const AppRouter = () => {
  return (
    <Router history={history}>
        {renderRoutes(routes)}
    </Router>
  );
};

export default AppRouter;