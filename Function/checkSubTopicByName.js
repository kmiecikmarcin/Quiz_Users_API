async function checkSubTopicByName(SubTopics, subTopicName) {
  const subTopic = await SubTopics.findOne({ where: { name: subTopicName } });
  if (subTopic !== null) {
    return subTopic;
  }
  return null;
}

module.exports = checkSubTopicByName;
