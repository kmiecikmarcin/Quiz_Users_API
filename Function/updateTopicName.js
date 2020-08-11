const findTopicByName = require('./findTopicByName');

async function updateTopicName(Topics, oldTopicName, topicName) {
  const findTopic = await findTopicByName(Topics, oldTopicName);
  if (findTopic !== null) {
    const result = await Topics.update({
      name: topicName,
    }, {
      where: { id_topic: findTopic.id },
    });
    if (result !== null) {
      return 'Topic updated!';
    }
    return 'Something went wrong!';
  }
  return findTopic;
}

module.exports = updateTopicName;
