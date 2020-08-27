/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function login(res, userPassword, userpassword, userId, userEmail, userIdRole, nameRole) {
  bcrypt.compare(userPassword, userpassword, function (err, result) {
    if (result === true) {
      jwt.sign({
        id: userId, email: userEmail, id_role: userIdRole, typeOfRole: nameRole,
      }, process.env.secretKey, { expiresIn: '36h' }, (err, token) => {
        res.status(200).json({ token });
      });
    } else {
      res.status(400).json({ Error: 'User name or password is incorrect!' });
    }
  });
}

module.exports = login;
