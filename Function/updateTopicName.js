const findTopicByName = require('./findTopicByName');

async function updateTopicName(Topics, oldTopicName, newTopicName, user) {
  const findTopic = await findTopicByName(Topics, oldTopicName);
  if (findTopic !== null) {
    const result = await Topics.update({
      name: newTopicName,
      id_user: user,
    }, {
      where: { id_topic: findTopic.id },
    });
    if (result !== null) {
      return result;
    }
    return null;
  }
  return null;
}

module.exports = updateTopicName;
