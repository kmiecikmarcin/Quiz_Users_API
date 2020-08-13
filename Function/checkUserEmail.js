async function checkUserEmail(Users, userEmail) {
  const email = await Users.findOne({ where: { email: userEmail } });
  if (email !== null) {
    return email;
  }
  return null;
}

module.exports = checkUserEmail;
