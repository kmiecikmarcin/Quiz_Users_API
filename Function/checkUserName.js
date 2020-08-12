/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
async function checkUsersByName(Users, userName) {
  const users = await Users.findOne({ where: { name: userName } });
  if (users === null) {
    return null;
  }
  return users;
}

module.exports = checkUsersByName;
