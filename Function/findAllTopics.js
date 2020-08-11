async function findAllTopics(Topics) {
  const topics = await Topics.findAll({ attributes: ['name'] });
  if (topics !== null) {
    return topics;
  }
  return 'Topics doesnt exists!';
}

module.exports = findAllTopics;
