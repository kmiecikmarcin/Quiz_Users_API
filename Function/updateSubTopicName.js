const findSubTopicByName = require('./findSubTopicByName');
const findUserRoleById = require('./findUserRoleById');
const TypesOfRoles = require('../Models/TypesOfRoles');

async function updateSubTopicName(SubTopics, oldSubTopicName, newSubTopicName, user) {
  const findSubTopic = await findSubTopicByName(SubTopics, oldSubTopicName);
  if (findSubTopic !== null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Nauczyciel') {
      const result = await SubTopics.update({
        name: newSubTopicName,
        id_user: user,
      }, {
        where: { id_subtopic: findSubTopic.id },
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

module.exports = updateSubTopicName;
