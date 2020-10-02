const express = require('express');
const router = express.Router();
const fs = require('fs');

const USERS_FILEPATH = 'src/data/users.json';

// список пользователей
router.get('/users', (req, res) => {
  getContent({
    filePath: USERS_FILEPATH,
    cb: (fileData) => {
      res.send(JSON.stringify(
        {
          ok: true,
          data: fileData
        }
      ));
    }
  })
});

// карточка пользователя
router.get('/users/:user_id', (req, res) => {
  getContent({
    filePath: USERS_FILEPATH,
    cb: (fileData) => {
      const { user_id } = req.params;
      const userData = fileData.list.filter(user => user.id == user_id);

      res.send(JSON.stringify(
        {
          ok: true,
          data: (userData.length > 0)
            ? userData[0]
            : {}
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