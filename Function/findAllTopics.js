async function findAllTopics(Topics) {
  const topics = await Topics.findAll({ attributes: ['name'] });
  if (topics.length !== 0) {
    return topics;
  }
  return null;
}

module.exports = findAllTopics;
