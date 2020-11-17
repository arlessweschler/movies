import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import history from '@/history';
import routes from '@/routing/routes';
import store from '@/redux/configureStore';
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