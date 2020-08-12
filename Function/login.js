/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function login(res, userPassword, userpassword, userId, userName, userIdRole) {
  bcrypt.compare(userPassword, userpassword, function (err, result) {
    if (result === true) {
      jwt.sign({ id: userId, name: userName, id_role: userIdRole }, process.env.secretKey, { expiresIn: '36h' }, (err, token) => {
        res.json({ token });
      });
    } else {
      res.json({ Response: 'User name or password is incorrect!' });
    }
  });
}

module.exports = login;
