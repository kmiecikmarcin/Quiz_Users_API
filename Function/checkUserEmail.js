async function checkUserEmail(Users, userEmail) {
  const user = await Users.findOne({ where: { email: userEmail } });
  if (user !== null) {
    return 'Email is already assigned to the other account!';
  }
  return user;
}

module.exports = checkUserEmail;
