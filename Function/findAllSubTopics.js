async function findAllSubTopics(SubTopics) {
  const subTopics = await SubTopics.findAll({ attributes: ['name'] });
  if (subTopics !== null) {
    return subTopics;
  }
  return 'Subtopics doesnt exists!';
}

module.exports = findAllSubTopics;
