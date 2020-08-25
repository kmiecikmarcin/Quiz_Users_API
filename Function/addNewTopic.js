const checkTopicByName = require('./checkTopicByName');
const findUserRoleById = require('./findUserRoleById');
const TypesOfRoles = require('../Models/TypesOfRoles');

async function addNewTopic(Topics, topicName, user, subjects) {
  const checkTopic = await checkTopicByName(Topics, topicName);
  if (checkTopic === null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole !== 'Uczeń') {
      const result = await Topics.create({
        name: topicName,
        id_user: user.id,
        id_subject: subjects,
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

module.exports = addNewTopic;
