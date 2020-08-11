const findSubTopicByName = require('./findSubTopicByName');

async function updateSubTopicName(SubTopics, oldSubTopicName, subTopicName) {
  const findSubTopic = await findSubTopicByName(SubTopics, oldSubTopicName);
  if (findSubTopic !== null) {
    const result = await SubTopics.update({
      name: subTopicName,
    }, {
      where: { id_subtopic: findSubTopic.id },
    });
    if (result !== null) {
      return 'Subtopic updated!';
    }
    return 'Something went wrong!';
  }
  return 'Subtopic doesnt exists!';
}

module.exports = updateSubTopicName;
