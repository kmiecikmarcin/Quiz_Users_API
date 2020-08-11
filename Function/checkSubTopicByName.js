async function checkSubTopicByName(SubTopics, subTopicName) {
  const topic = await SubTopics.findOne({ where: { name: subTopicName } });
  if (topic !== null) {
    return 'This subtopic exists!';
  }
  return topic;
}

module.exports = checkSubTopicByName;
