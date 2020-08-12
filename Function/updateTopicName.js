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
      return 'Topic updated!';
    }
    return 'Something went wrong!';
  }
  return 'Old topic name doesnt exists!';
}

module.exports = updateTopicName;
