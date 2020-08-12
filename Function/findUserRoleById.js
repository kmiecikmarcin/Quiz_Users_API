async function findUserRoleById(TypesOfRoles, user) {
  const result = await TypesOfRoles.findOne({ where: { id: user } });
  if (result !== null) {
    return result.name;
  }
  return null;
}

module.exports = findUserRoleById;
