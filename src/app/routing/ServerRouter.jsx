import React from 'react';
import PT from 'prop-types';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { HelmetProvider } from 'react-helmet-async';

import { configureI18next } from '@/i18n';

const ServerRouter = ({
  initialLanguage,
  helmetContext,
  routerContext,
  routes,
  store,
  url
}) => {
  const i18n = configureI18next(initialLanguage);

  return (
    <HelmetProvider context={helmetContext}>
      <StaticRouter
        location={url}
        context={routerContext}
      >
        {renderRoutes(routes, {
          store,
          i18n
        })}
      </StaticRouter>
    </HelmetProvider>
  );
};

ServerRouter.propTypes = {
  initialLanguage: PT.string.isRequired,
  helmetContext: PT.object.isRequired,
  routerContext: PT.object.isRequired,
  url: PT.string.isRequired,
  routes: PT.array.isRequired,
  store: PT.object.isRequired
};

export default ServerRouter;