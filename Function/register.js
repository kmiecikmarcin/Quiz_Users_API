/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');

function register(res, Users, userName, userPassword, userEmail, usersId) {
  bcrypt.hash(userPassword, 8, function (err, hash) {
    Users.create({
      name: userName,
      password: hash,
      email: userEmail,
      id_role: usersId,
    })
      .then(() => res.json({ Komunikat: 'Registration successful' }))
      .catch(() => res.json({ catchError: 'User or email is exists!' }));
  });
}

module.exports = register;
