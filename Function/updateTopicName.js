const findTopicByName = require('./findTopicByName');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findUserRoleById = require('./findUserRoleById');

async function updateTopicName(Topics, oldTopicName, newTopicName, user) {
  const findTopic = await findTopicByName(Topics, oldTopicName);
  if (findTopic !== null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Nauczyciel') {
      const result = await Topics.update({
        name: newTopicName,
        id_user: user.id,
      }, {
        where: { id_topic: findTopic.id },
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

module.exports = updateTopicName;
