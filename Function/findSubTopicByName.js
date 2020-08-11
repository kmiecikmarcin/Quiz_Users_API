async function findSubTopicByName(SubTopics, subTopicName) {
  const result = await SubTopics.findOne({ where: { name: subTopicName } });
  if (result !== null) {
    return result;
  }
  return null;
}

module.exports = findSubTopicByName;
