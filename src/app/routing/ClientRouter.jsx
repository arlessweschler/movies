import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import store from '@/redux/configureStore';
import routes from '@/routing/routes';
import history from '@/routing/history';
import { configureI18next } from '@/settings/i18n';

const ClientRouter = () => (
  <Router history={history}>
    {renderRoutes(routes, {
      store,
      i18n: configureI18next()
    })}
  </Router>
);

export default ClientRouter;