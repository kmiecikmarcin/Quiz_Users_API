const checkTopicByName = require('./checkTopicByName');
const checkSubTopicByName = require('./checkSubTopicByName');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findUserRoleById = require('./findUserRoleById');

async function addNewSubTopic(SubTopics, Topics, topicName, subTopicName, user) {
  const checkTopic = await checkTopicByName(Topics, topicName, true);
  if (checkTopic !== null) {
    const checkSubTopic = await checkSubTopicByName(SubTopics, subTopicName);
    if (checkSubTopic === null) {
      const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
      if (userRole !== 'Uczeń') {
        const result = await SubTopics.create({
          name: subTopicName,
          id_user: user.id,
          id_topic: checkTopic.id,
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
  return null;
}

module.exports = addNewSubTopic;
