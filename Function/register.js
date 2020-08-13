/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');

async function register(res, Users, userName, userPassword, userEmail, usersId) {
  const hash = await bcrypt.hash(userPassword, 8);

  const user = await Users.create({
    name: userName,
    password: hash,
    email: userEmail,
    id_role: usersId,
  });

  return user;
}

module.exports = register;
