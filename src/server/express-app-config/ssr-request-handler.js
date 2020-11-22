import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import rootSaga from '@/redux/rootSaga';
import { configureStore } from '@/redux/configureStore';
import { configureI18next } from '@/i18n';

export default (ROUTES) => (req, res) => {
  const branch = matchRoutes(ROUTES, req.path);
  const { lng: initialLanguage = 'en' } = req.query;

  /* eslint-disable no-console */
  console.log('\n--ssr-request-handler');
  console.log('req.url:', req.url);
  console.log('req.query:', req.query);
  console.log('initialLanguage:', initialLanguage);
  /* eslint-disable no-console */

  const store = configureStore();
  const i18n = configureI18next(initialLanguage);

  store.runSaga(rootSaga).toPromise().then(() => {
    const preloadedState = store.getState();
    const preloadedStateStr = JSON.stringify(preloadedState).replace(/</g, '\\u003c');

    const context = {};
    const helmetContext = {};

    const rootContent = renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          {renderRoutes(ROUTES, { store, i18n })}
        </StaticRouter>
      </HelmetProvider>
    );

    if (context.status === 404) {
      res.status(404);
    }

    res.render('index', {
      IS_SSR: true,
      rootContent,
      preloadedState: preloadedStateStr,
      pageTitle: helmetContext.helmet.title.toString()
    });
  }).catch((e) => {
    res.status(500).send(e.message);
  });

  branch.forEach(({ route }) => {
    const { fetchData } = route.component;
    if (fetchData instanceof Function) {
      fetchData(store, req.url, req.params);
    }
  });

  store.close();
};