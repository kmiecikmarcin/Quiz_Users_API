const findSubTopicByName = require('./findSubTopicByName');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findUserRoleById = require('./findUserRoleById');

async function deleteSubTopic(SubTopics, subTopicName, user) {
  const findSubTopic = await findSubTopicByName(SubTopics, subTopicName);
  if (findSubTopic !== null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Administrator') {
      const result = await SubTopics.destroy({
        where: {
          id_subtopic: findSubTopic.id,
          name: subTopicName,
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

module.exports = deleteSubTopic;
