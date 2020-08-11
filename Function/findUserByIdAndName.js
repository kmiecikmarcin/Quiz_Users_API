function findUserByIdAndName(Users, authData) {
  const user = Users.findOne({ where: { id: authData.id, name: authData.name } });
  if (user === null) {
    return 'Użytkownik nie istnieje!';
  }
  return user;
}

module.exports = findUserByIdAndName;