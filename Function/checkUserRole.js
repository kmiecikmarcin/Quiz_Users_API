async function checkTypeOfRole(TypesOfRoles, userRole) {
  const user = await TypesOfRoles.findOne({ where: { name: userRole } });
  if (user == null) {
    return 'Podana rola nie istnieje';
  }
  return user;
}

module.exports = checkTypeOfRole;
