/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
async function checkUsersByName(Users, userName) {
  const users = await Users.findOne({ where: { name: userName } });
  if (users !== null) {
    return users;
  }
  return null;
}

module.exports = checkUsersByName;
