const express = require('express');
import logger from 'morgan';

const PORT = 8080;
const CLIENT_FOLDER = 'dist/client';

const app = express();
app.use(logger('dev'));

app.use(express.static(CLIENT_FOLDER));
app.get("*", (req, res) => {
  res.sendFile(`${CLIENT_FOLDER}/index.html`, { root: '.' });
});

app.listen(PORT, () => console.log(`\n-- listening on port: ${PORT} --`));