import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

import { store } from 'app_root/routing/RootRoute';

export default function (ROUTES) {
  return function (req, res) {
    const branch = matchRoutes(ROUTES, req.path);
    console.log('-- ssr-request-handler');
    console.log('req.url:', req.url);
    console.log('req.path :', req.path );
    console.log('req.params:', req.params);
    console.log('req.query:', req.query);

    const promises = branch.map(({ route, match }) => {
      const fetchData = route.component.fetchData;
      return fetchData instanceof Function ? fetchData(store, req.params, req.query) : Promise.resolve(null)
    });

    Promise.all(promises).then((data) => {
      const preloadedState = store.getState();
      const preloadedStateStr = JSON.stringify(preloadedState).replace(/</g, "\\u003c");

      let context = {};

      const rootContent = renderToString(
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(ROUTES)}
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

    });
  }
};