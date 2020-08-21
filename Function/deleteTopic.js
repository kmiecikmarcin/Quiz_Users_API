const findUserRoleById = require('./findUserRoleById');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findTopicByName = require('./findTopicByName');

async function deleteTopic(Topics, topicName, user) {
  const checkTopic = await findTopicByName(Topics, topicName);
  if (checkTopic !== null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Administrator') {
      const result = await Topics.destroy({
        where: {
          id_topic: checkTopic.id,
          name: topicName,
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

module.exports = deleteTopic;