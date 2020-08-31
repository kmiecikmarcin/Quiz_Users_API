async function findRepetitoryBySubtopicId(Repetitory, subTopic) {
  const repetitory = await Repetitory.findAll({ where: { id_subtopic: subTopic }, attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'id_user'] } });
  if (repetitory.length !== 0) {
    return repetitory;
  }
  return null;
}

module.exports = findRepetitoryBySubtopicId;
