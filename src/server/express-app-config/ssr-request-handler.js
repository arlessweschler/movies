import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

import rootSaga from '@/redux/rootSaga';
import { configureStore } from '@/redux/configureStore';

export default (ROUTES) => (req, res) => {
  const branch = matchRoutes(ROUTES, req.path);
  const store = configureStore();

  /* eslint-disable no-console */
  console.log('\n--ssr-request-handler');
  console.log('req.url:', req.url);
  console.log('req.query:', req.query);
  /* eslint-disable no-console */

  store.runSaga(rootSaga).toPromise().then(() => {
    const preloadedState = store.getState();
    const preloadedStateStr = JSON.stringify(preloadedState).replace(/</g, '\\u003c');

    const context = {};

    const rootContent = renderToString(
      <StaticRouter
        location={req.url}
        context={context}
      >
        {renderRoutes(ROUTES, { store })}
      </StaticRouter>
    );

    if (context.status === 404) {
      res.status(404);
    }

    res.render('index', {
      rootContent,
      preloadedState: preloadedStateStr,
      IS_SSR: true
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