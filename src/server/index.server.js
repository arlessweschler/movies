const express = require('express');
import logger from 'morgan';
const path = require('path');

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

import appResponseHeaders from 'server_config/app-response-headers';
const { PORT_SERVER, IS_SSR } = process.env;
const CLIENT_FOLDER = 'dist/client';
import ROUTES from 'app_root/routing/routes';

console.log(`process.env: ${JSON.stringify(process.env, null, 4)}`);

const app = express();
app.use(logger('dev'));

app.use(appResponseHeaders);


/* if (IS_SSR) {
  const RESOURCES = ['js', 'css', 'assets'];

  RESOURCES.forEach(function (item) {
    app.use(`/${item}`, express.static(path.join(__dirname + `/client/${item}`)));
  });

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname + '/client/views'));

  app.get("*", (req, res) => {
    let context = {};

    const rootContent = renderToStaticMarkup(
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(ROUTES)}
      </StaticRouter>
    );

    res.render('index', {
      rootContent,
      IS_SSR: true
    });
  });

} else {
  app.use(express.static(CLIENT_FOLDER));
  app.get("*", (req, res) => {
    res.sendFile(`${CLIENT_FOLDER}/index.html`, { root: '.' });
  });
} */

app.use('/api', require('server_api/users'));

app.listen(PORT_SERVER, () => {
  console.log(`\n-- listening on port: ${PORT_SERVER} --`);
});