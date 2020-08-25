const TypesOfRoles = require('../Models/TypesOfRoles');
const findRepetitoryByName = require('./findRepetitoryByName');
const findUserRoleById = require('./findUserRoleById');

async function deleteRepetitory(Repetitory, titleOfRepetitory, user, subTopic) {
  const findRepetitory = await findRepetitoryByName(Repetitory, titleOfRepetitory);
  if (findRepetitory !== null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Administrator') {
      const result = await Repetitory.destroy({
        where: {
          title: titleOfRepetitory,
          id_subtopic: subTopic.id,
        },
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

module.exports = deleteRepetitory;
