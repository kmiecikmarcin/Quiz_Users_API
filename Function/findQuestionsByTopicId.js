async function findQuestionsByTopicId(Questions, topic) {
  const questions = await Questions.findAll({ where: { id_topic: topic } });
  if (questions.length !== 0) {
    questions.array.forEach((index) => {
      if (index > 0 && index < 6) {
        return questions;
      }
      return null;
    });
  }
  return null;
}

module.exports = findQuestionsByTopicId;
