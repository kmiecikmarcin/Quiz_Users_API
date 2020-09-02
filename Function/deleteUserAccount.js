const findUserByIdAndEmail = require('./findUserById');

async function deleteUserAccount(Users, authData) {
  const findUser = await findUserByIdAndEmail(Users, authData);
  if (findUser !== null) {
    const deleteAccount = await Users.destroy({
      where: {
        id_user: authData.id,
      },
    });
    if (deleteAccount !== null) {
      return deleteAccount;
    }
    return null;
  }
  return null;
}

module.exports = deleteUserAccount;
