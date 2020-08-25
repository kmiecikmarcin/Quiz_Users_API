/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');
const findUserByIdAndEmail = require('./findUserByIdAndEmail');

async function changeUserPassword(Users, user, oldUserPassword,
  newUserPassword) {
  const checkUser = await findUserByIdAndEmail(Users, user);
  if (checkUser !== null) {
    const result = await bcrypt.compare(oldUserPassword, checkUser.password);
    if (result === true) {
      const hash = await bcrypt.hash(newUserPassword, 8);
      const changePassword = await Users.update({
        password: hash,
      }, {
        where: { id_user: user.id },
      });
      if (changePassword !== null) {
        return changePassword;
      }
      return null;
    }
    const response = false;
    return response;
  }
  return null;
}

module.exports = changeUserPassword;
