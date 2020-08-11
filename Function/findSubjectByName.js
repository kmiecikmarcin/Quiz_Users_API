async function findSubjectByName(Subjects, subject) {
  const result = await Subjects.findOne({ where: { name: subject } });
  if (result !== null) {
    return result;
  }
  return 'This subject doesnt exists!';
}

module.exports = findSubjectByName;
