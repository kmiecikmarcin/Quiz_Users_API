const checkTopicByName = require('./checkTopicByName');

async function addNewTopic(Topics, topicName, user, subjects) {
  const checkTopic = await checkTopicByName(Topics, topicName);
  if (checkTopic === null) {
    const result = await Topics.create({
      name: topicName,
      id_user: user,
      id_subject: subjects,
    });
    if (result !== null) {
      return result;
    }
    return null;
  }
  return null;
}

module.exports = addNewTopic;
