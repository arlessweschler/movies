import logger from 'morgan';

import routes from '@/routing/common/routes';
import {
  responseHeaders,
  extractRoutes,
  ssrRequestHandler
} from '@/server/express-app-config';

const envConfig = require('@/configs/env/env-config');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const favicon = require('serve-favicon');
const path = require('path');

const CLIENT_FOLDER = 'dist/client';

const app = express();
app.use(favicon(path.join(`${__dirname}/client/favicon.ico`)));
app.use(responseHeaders);

if (envConfig.DEBUG_MODE === '1') {
  app.use(logger('dev'));
}

// SSR (server-side rendering)
if (envConfig.RENDERING === 'server') {

  const RESOURCES = ['js', 'css', 'assets'];

  RESOURCES.forEach((item) => {
    app.use(`/${item}`, expressStaticGzip(path.join(`${__dirname}/client/${item}`)));
  });

  app.set('view engine', 'pug');
  app.set('views', path.join(`${__dirname}/client/views`));

  app.get('*', ssrRequestHandler);

  // CSR (client-side rendering)
} else {

  const routesList = extractRoutes(routes);

  app.use(expressStaticGzip(CLIENT_FOLDER));

  // CSR business-logic routes
  app.get(routesList, (req, res) => {
    res.sendFile(`${CLIENT_FOLDER}/index.html`, { root: '.' });
  });

  // CSR 404 route
  app.use((req, res) => {
    res.status(404);
    res.sendFile(`${CLIENT_FOLDER}/index.html`, { root: '.' });
  });
}

const PORT = process.env.PORT || envConfig.PORT_SERVER;
const listener = app.listen(PORT, (err) => {
  if (err) throw new Error('Express app port listening error:', err);

  /* eslint-disable no-console */
  console.log('\n---Express app is listening on:', listener.address());
  /* eslint-disable no-console */
});