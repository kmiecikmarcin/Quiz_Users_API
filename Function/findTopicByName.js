async function findTopicByName(Topics, topicName) {
  const result = await Topics.findOne({ where: { name: topicName } });
  if (result !== null) {
    return result;
  }
  return 'Topics doesnt exists';
}

module.exports = findTopicByName;