const checkTopicByName = require('./checkTopicByName');
const checkSubTopicByName = require('./checkSubTopicByName');

async function addNewSubTopic(SubTopics, Topics, topicName, subTopicName, user) {
  const checkTopic = await checkTopicByName(Topics, topicName, true);
  if (checkTopic !== null) {
    const checkSubTopic = await checkSubTopicByName(SubTopics, subTopicName);
    if (checkSubTopic === null) {
      const result = await SubTopics.create({
        name: subTopicName,
        id_user: user,
        id_topic: checkTopic.id,
      });
      if (result !== null) {
        return result;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = addNewSubTopic;
