import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader/root';

import routes from 'app_root/routing/routes';
import { history } from 'redux_store';

const ClientEntry = () => {
  return (
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  );
};

export default hot(ClientEntry);