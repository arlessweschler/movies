const express = require('express');
const router = express.Router();
const fs = require('fs');

const USERS_FILEPATH = 'src/data/users.json';

router.get('/users', (req, res) => {
  getContent({
    filePath: USERS_FILEPATH,
    cb: (jsonContent) => {
      res.send(JSON.stringify(
        {
          ok: true,
          data: jsonContent
        }
      ));
    }
  })
});

function getContent({ cb, filePath }) {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    try {
      cb(JSON.parse(data));

    } catch (error) {
      throw new Error('Server API json parsing error!');
    }
  });
}

module.exports = router;