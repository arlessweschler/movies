const express = require('express');
import logger from 'morgan';
const path = require('path');

import appResponseHeaders from 'server_config/app-response-headers';
import extractRoutes from 'server_config/routes-extractor';
import getSsrRequestHandler from 'server_config/ssr-request-handler';
import REACT_ROUTES from 'app_root/routing/routes';
const { PORT_SERVER, IS_SSR } = process.env;
const CLIENT_FOLDER = 'dist/client';


console.log(`process.env: ${JSON.stringify(process.env, null, 4)}`);

const app = express();
app.use(logger('dev'));
app.use(appResponseHeaders);

const EXPRESS_ROUTES = extractRoutes(REACT_ROUTES);
console.log('EXPRESS_ROUTES:', EXPRESS_ROUTES);

// API
app.use('/api', require('server_api/users'));

// серверный рендеринг
if (IS_SSR) {
  const RESOURCES = ['js', 'css', 'assets'];

  RESOURCES.forEach(function (item) {
    app.use(`/${item}`, express.static(path.join(__dirname + `/client/${item}`)));
  });

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname + '/client/views'));

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



app.listen(PORT_SERVER, () => {
  console.log(`\n-- listening on port: ${PORT_SERVER} --`);
});