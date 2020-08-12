async function findAllSubjects(Subjects) {
  const subjects = await Subjects.findAll({ attributes: ['name'] });
  if (subjects !== null) {
    return subjects;
  }
  return 'Subjects doesnt exists!';
}

module.exports = findAllSubjects;
