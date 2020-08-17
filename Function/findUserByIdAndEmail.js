async function findUserByIdAndEmail(Users, authData) {
  const user = await Users.findOne({ where: { id: authData.id, email: authData.email } });
  if (user === null) {
    return null;
  }
  return user;
}

module.exports = findUserByIdAndEmail;
