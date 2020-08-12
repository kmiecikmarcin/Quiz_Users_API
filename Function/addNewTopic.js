const checkTopicByName = require('./checkTopicByName');

async function addNewTopic(Topics, topicName, user, subjects) {
  const checkTopic = await checkTopicByName(Topics, topicName, false);
  if (checkTopic === null) {
    const result = await Topics.create({
      name: topicName,
      id_user: user,
      id_subject: subjects,
    });
    if (result !== null) {
      return 'New topic successfully added!';
    }
    return 'Something went wrong!';
  }
  return checkTopic;
}

module.exports = addNewTopic;
