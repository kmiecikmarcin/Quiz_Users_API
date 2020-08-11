async function checkUserEmail(Users, userEmail) {
  const user = await Users.findOne({ where: { email: userEmail } });
  if (user !== null) {
    return 'Podany email jest już przypisany do konta!';
  }
  return user;
}

module.exports = checkUserEmail;
