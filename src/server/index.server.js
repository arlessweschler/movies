import logger from 'morgan';

import REACT_ROUTES from '@/routing/routes';
import {
  responseHeaders,
  extractRoutes,
  handleSSR
} from '@/server/express-app-config';

const envConfig = require('@/configs/env/env-config');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const CLIENT_FOLDER = 'dist/client';

const app = express();
app.use(favicon(path.join(`${__dirname}/client/favicon.ico`)));
app.use(responseHeaders);

if (envConfig.DEBUG_MODE === '1') {
  app.use(logger('dev'));
}

const EXPRESS_ROUTES = extractRoutes(REACT_ROUTES);

// серверный рендеринг
if (envConfig.RENDERING === 'server') {
  const RESOURCES = ['js', 'css', 'assets'];

  RESOURCES.forEach((item) => {
    app.use(`/${item}`, express.static(path.join(`${__dirname}/client/${item}`)));
  });

  app.set('view engine', 'pug');
  app.set('views', path.join(`${__dirname}/client/views`));

  app.get('*', handleSSR(REACT_ROUTES));

  // клиентский рендеринг
} else {
  // ассеты
  app.use(express.static(CLIENT_FOLDER));

  // CSR прикладные маршруты
  app.get(EXPRESS_ROUTES, (req, res) => {
    res.sendFile(`${CLIENT_FOLDER}/index.html`, { root: '.' });
  });

  // CSR 404
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