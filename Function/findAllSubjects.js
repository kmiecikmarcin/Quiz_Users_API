async function findAllSubjects(Subjects) {
  const subjects = await Subjects.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'id_user', 'id_topic'] } });
  if (subjects.length !== 0) {
    return subjects;
  }
  return null;
}

module.exports = findAllSubjects;
