async function findAllSubTopics(SubTopics) {
  const subTopics = await SubTopics.findAll({ attributes: ['id', 'name', 'id_topic'] });
  if (subTopics.length !== 0) {
    return subTopics;
  }
  return null;
}

module.exports = findAllSubTopics;
