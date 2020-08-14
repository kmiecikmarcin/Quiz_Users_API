async function checkTopicByName(Topics, topicName) {
  const topic = await Topics.findOne({ where: { name: topicName } });
  if (topic !== null) {
    return topic;
  }
  return null;
}

module.exports = checkTopicByName;
