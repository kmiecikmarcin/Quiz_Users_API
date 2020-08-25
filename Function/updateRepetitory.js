const findRepetitoryByName = require('./findRepetitoryByName');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findUserRoleById = require('./findUserRoleById');

async function updateRepetitory(Repetitory, oldTitleOfRepetitory, titleOfRepetitory,
  repetitoryData, user) {
  const findRepetitory = findRepetitoryByName(Repetitory, oldTitleOfRepetitory);
  if (findRepetitory !== null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Nauczyciel') {
      const result = await Repetitory.update({
        title: titleOfRepetitory,
        data: repetitoryData,
      }, {
        where: { title: oldTitleOfRepetitory },
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

module.exports = updateRepetitory;
