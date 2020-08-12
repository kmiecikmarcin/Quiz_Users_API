async function findUserByIdAndName(Users, authData) {
  const user = await Users.findOne({ where: { id: authData.id, name: authData.name } });
  if (user === null) {
    return null;
  }
  return user;
}

module.exports = findUserByIdAndName;
