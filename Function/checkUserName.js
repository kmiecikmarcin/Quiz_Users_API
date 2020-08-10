/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
async function checkUsersByName(Users, userName) {
  const users = await Users.findOne({ where: { name: userName } });
  if (users == null) {
    return 'Użytkownik nie istnieje!';
  }
  return users;
}

module.exports = checkUsersByName;
