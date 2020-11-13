import logger from 'morgan';

import appResponseHeaders from 'server_config/app-response-headers';
import extractRoutes from 'server_config/routes-extractor';
import getSsrRequestHandler from 'server_config/ssr-request-handler';
import REACT_ROUTES from 'app_routing/routes';

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const dotenv = require('dotenv-defaults');

const env = dotenv.config({ defaults: path.resolve('./configs/defaults/.env.defaults') }).parsed;
const CLIENT_FOLDER = 'dist/client';

console.log(`index.server.js, env: ${JSON.stringify(env, null, 4)}`);
console.log('index.server.js, process.env.PORT:', process.env.PORT);

const app = express();
app.use(favicon(path.join(`${__dirname}/client/favicon.ico`)));
app.use(logger('dev'));
app.use(appResponseHeaders);

const EXPRESS_ROUTES = extractRoutes(REACT_ROUTES);
console.log('EXPRESS_ROUTES:', EXPRESS_ROUTES);

// серверный рендеринг
if (env.RENDERING === 'server') {
  const RESOURCES = ['js', 'css', 'assets'];

  RESOURCES.forEach((item) => {
    app.use(`/${item}`, express.static(path.join(`${__dirname}/client/${item}`)));
  });

  app.set('view engine', 'pug');
  app.set('views', path.join(`${__dirname}/client/views`));

  app.get('*', getSsrRequestHandler(REACT_ROUTES));

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

const PORT = process.env.PORT || env.PORT_SERVER;
const listener = app.listen(PORT, (err) => {
  if (err) throw new Error('Express app port listening error:', err);
  console.log('\n--Express app listening on:', listener.address());
});