async function findQuestionsByTopicId(Questions, topic) {
  const questions = await Questions.findAll({ where: { id_topic: topic } }, { attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'id_user', 'id_topic'] } });
  if (questions.length !== 0) {
    return questions;
  }
  return null;
}

module.exports = findQuestionsByTopicId;
