async function findQuestionsByTopicId(Questions, topic) {
  const questions = await Questions.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'id_user', 'id_topic'] } }, { where: { id_topic: topic } });
  if (questions.length !== 0) {
    return questions;
  }
  return null;
}

module.exports = findQuestionsByTopicId;
