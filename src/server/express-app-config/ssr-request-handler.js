import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

import { configureStore } from 'redux_store';
import rootSaga from 'app_redux/rootSaga';

export default function (ROUTES) {
  return function (req, res) {
    const branch = matchRoutes(ROUTES, req.path);
    console.log('-- ssr-request-handler');
    console.log('req.url:', req.url);
    console.log('req.path :', req.path);
    console.log('req.params:', req.params);
    console.log('req.query:', req.query);

    const store = configureStore();

    store.runSaga(rootSaga).toPromise().then(() => {
      console.log('-- ssr-request-handler, toPromise()');

      const preloadedState = store.getState();
      const preloadedStateStr = JSON.stringify(preloadedState).replace(/</g, "\\u003c");

      let context = {};

      const rootContent = renderToString(
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(ROUTES, { store })}
        </StaticRouter>
      );

      if (context.status == 404) {
        res.status(404);
      }

      res.render('index', {
        rootContent,
        preloadedState: preloadedStateStr,
        IS_SSR: true
      });

    }).catch((e) => {
      console.log('-- ssr-request-handler, catch, e.message:', e.message);
      res.status(500).send(e.message);
    });

    branch.forEach(({ route }) => {
      const fetchData = route.component.fetchData;
      if (fetchData instanceof Function) {
        fetchData(store, req.url, req.params)
      }
    });

    store.close();
  }
}