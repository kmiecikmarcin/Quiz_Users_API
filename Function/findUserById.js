async function findUserById(Users, authData) {
  const user = await Users.findOne({ where: { id: authData.id } });
  if (user === null) {
    return null;
  }
  return user;
}

module.exports = findUserById;
