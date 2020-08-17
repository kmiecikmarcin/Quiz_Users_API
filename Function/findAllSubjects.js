async function findAllSubjects(Subjects) {
  const subjects = await Subjects.findAll({ attributes: ['name'] });
  if (subjects.length !== 0) {
    return subjects;
  }
  return null;
}

module.exports = findAllSubjects;
