async function findUserRoleByName(TypesOfRoles, typeOfRole) {
  const findRole = await TypesOfRoles.findOne({ where: { name: typeOfRole } });
  if (findRole !== null) {
    return findRole.name;
  }
  return null;
}

module.exports = findUserRoleByName;
