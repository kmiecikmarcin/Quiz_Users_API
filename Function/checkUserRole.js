async function checkTypeOfRole(TypesOfRoles, userRole) {
  const user = await TypesOfRoles.findOne({ where: { name: userRole } });
  if (user == null) {
    return 'Entered role doesnt exists';
  }
  return user;
}

module.exports = checkTypeOfRole;
