const express = require('express');
import logger from 'morgan';

const PORT = 8080;
const CLIENT_FOLDER = 'dist/client';
const ROUTES = ['/', '/dashboard', '/users'];

const app = express();
app.use(logger('dev'));
useRoutes();

app.listen(PORT, () => console.log(`\n-- listening on p122ort: ${PORT} --`));

function useRoutes() {
  for (let route of ROUTES) {
    app.use(route, express.static(CLIENT_FOLDER));
  }
}