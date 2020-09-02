const bcrypt = require('bcrypt');

async function changeUserEmailAdress(Users, user, newUserEmailAdress, userPassword) {
  const findUser = await Users.findOne({ where: { id: user.id } });
  if (findUser !== null) {
    const checkPassword = await bcrypt.compare(userPassword, findUser.password);
    if (checkPassword === true) {
      const result = await Users.update({
        email: newUserEmailAdress,
      }, {
        where: { id: user.id },
      });
      if (result !== null) {
        return result;
      }
      return null;
    }
    const response = false;
    return response;
  }
  return null;
}

module.exports = changeUserEmailAdress;
