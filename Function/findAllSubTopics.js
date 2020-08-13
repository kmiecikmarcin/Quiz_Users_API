async function findAllSubTopics(SubTopics) {
  const subTopics = await SubTopics.findAll({ attributes: ['name'] });
  if (subTopics.length !== 0) {
    return subTopics;
  }
  return null;
}

module.exports = findAllSubTopics;
