const findSubTopicByName = require('./findSubTopicByName');

async function updateSubTopicName(SubTopics, oldSubTopicName, newSubTopicName, user) {
  const findSubTopic = await findSubTopicByName(SubTopics, oldSubTopicName);
  if (findSubTopic !== null) {
    const result = await SubTopics.update({
      name: newSubTopicName,
      id_user: user,
    }, {
      where: { id_subtopic: findSubTopic.id },
    });
    if (result !== null) {
      return result;
    }
    return null;
  }
  return null;
}

module.exports = updateSubTopicName;
