const findUserRoleByName = require('./findUserRoleByName');
const findUserRoleById = require('./findUserRoleById');

async function addNewTypeOfUserRole(TypesOfRoles, typeOfRole, user) {
  const checkRole = await findUserRoleByName(TypesOfRoles, typeOfRole);
  if (checkRole === null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Administrator') {
      const result = await TypesOfRoles.create({
        name: typeOfRole,
      });
      if (result !== null) {
        return result;
      }
      return null;
    }
    const response = false;
    return response;
  }
  return null;
}

module.exports = addNewTypeOfUserRole;
