import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { HelmetProvider } from 'react-helmet-async';

import history from '@/routing/history';
import routes from '@/routing/routes';
import store from '@/redux/configureStore';
import { configureI18next } from '@/i18n';

const i18n = configureI18next();

const ClientRouter = () => (
  <HelmetProvider>
    <Router history={history}>
      {renderRoutes(routes, {
        store,
        i18n
      })}
    </Router>
  </HelmetProvider>
);

export default ClientRouter;