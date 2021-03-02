import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';

import { configureStore } from '@/redux/configureStore';
import rootSaga from '@/redux/rootSaga';
import ServerRouter from '@/routing/ServerRouter';

const envConfig = require('@/configs/env/env-config');

export default (routes) => (req, res) => {

  /* eslint-disable no-console */
  if (envConfig.DEBUG_MODE === '1') {
    console.log('\n--- ssr-request-handler');
    console.log('req.url:', req.url);
    console.log('req.query:', req.query);
  }
  /* eslint-disable no-console */

  const { lng: initialLanguage = 'en' } = req.query;

  const routerContext = {};
  const helmetContext = {};

  /*
  We create new store on every request.
  It prevents possible security issues with mixing different users data in one store.
  */
  const store = configureStore();

  store.runSaga(rootSaga).toPromise().then(() => {
    const preloadedState = store.getState();

    /*
    For security reasons, we are escaping the < characters.
    This ensures that no HTML can get injected into the page via the contents of the Redux store.
    */
    const preloadedStateStr = JSON.stringify(preloadedState).replace(/</g, '\\u003c');

    // Prepare content to render
    const rootContent = renderToString(
      <ServerRouter
        initialLanguage={initialLanguage}
        helmetContext={helmetContext}
        routerContext={routerContext}
        routes={routes}
        store={store}
        url={req.url}
      />
    );

    // SSR 404 route
    if (routerContext.status === 404) {
      res.status(404);
    }

    // Render previously prepared content
    res.render('index', {
      IS_SSR: true,
      rootContent,
      preloadedState: preloadedStateStr,
      pageTitle: helmetContext.helmet.title.toString()
    });

  }).catch((e) => {
    res.status(500).send(e.message);
  });

  const branch = matchRoutes(routes, req.path);

  // SSR data fetching (used by route containers)
  branch.forEach(({ route }) => {
    const { fetchData } = route.component;
    if (fetchData instanceof Function) {
      fetchData(store, req.url, req.params);
    }
  });

  store.close();
};