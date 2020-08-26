async function findAllTopics(Topics) {
  const topics = await Topics.findAll({ attributes: ['id', 'name', 'id_subject'] });
  if (topics.length !== 0) {
    return topics;
  }
  return null;
}

module.exports = findAllTopics;
