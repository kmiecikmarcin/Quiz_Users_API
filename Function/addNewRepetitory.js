const findRepetitoryByName = require('./findRepetitoryByName');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findUserRoleById = require('./findUserRoleById');

async function addNewRepetitory(Repetitory, titleOfRepetitory, repetitoryData, user, subTopic) {
  const findRepetitory = await findRepetitoryByName(Repetitory, titleOfRepetitory);
  if (findRepetitory === null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Nauczyciel') {
      const result = await Repetitory.create({
        title: titleOfRepetitory,
        data: repetitoryData,
        id_user: user.id,
        id_subtopic: subTopic,
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

module.exports = addNewRepetitory;
