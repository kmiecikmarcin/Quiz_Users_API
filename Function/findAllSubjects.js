async function findAllSubjects(Subjects) {
  const subjects = await Subjects.findAll({ attributes: ['name'] });
  if (subjects !== null) {
    return subjects;
  }
  return 'Coś poszło nie tak!';
}

module.exports = findAllSubjects;
