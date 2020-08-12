async function checkTopicByName(Topics, topicName, checkResponse) {
  const topic = await Topics.findOne({ where: { name: topicName } });
  if (topic !== null && checkResponse === true) {
    return topic;
  } if (topic !== null && checkResponse === false) {
    return 'This topic exists!';
  }
  return null;
}

module.exports = checkTopicByName;
