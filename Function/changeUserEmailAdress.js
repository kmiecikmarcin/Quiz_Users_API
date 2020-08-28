async function changeUserEmailAdress(Users, user) {
  const result = await Users.findOne({ where: { email: user.email } });
  if (result !== null) {

  }
  return null;
}

module.exports = changeUserEmailAdress;
