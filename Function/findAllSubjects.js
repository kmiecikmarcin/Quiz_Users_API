async function findAllSubjects(Subjects) {
  const subjects = await Subjects.findAll({ where: { name: { $ne: 0 } } });
  if (subjects.length !== 0) {
    return subjects;
  }
  return null;
}

module.exports = findAllSubjects;
