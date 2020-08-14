/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');

async function register(res, Users, userEmail, userPassword, usersId) {
  const hash = await bcrypt.hash(userPassword, 8);

  const user = await Users.create({
    email: userEmail,
    password: hash,
    id_role: usersId,
  });

  return user;
}

module.exports = register;
