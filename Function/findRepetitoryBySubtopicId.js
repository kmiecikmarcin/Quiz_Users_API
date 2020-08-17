async function findRepetitoryBySubtopicId(Repetitory, subTopic) {
  const repetitory = await Repetitory.findAll({ where: { id_subtopic: subTopic } });
  if (repetitory.length !== 0) {
    return repetitory;
  }
  return null;
}

module.exports = findRepetitoryBySubtopicId;
