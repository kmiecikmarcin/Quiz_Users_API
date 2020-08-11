async function checkTopicByName(Topics, topicName) {
  const topic = await Topics.findOne({ where: { name: topicName } });
  if (topic !== null) {
    return 'This topic exists!';
  }
  return topic;
}

module.exports = checkTopicByName;
