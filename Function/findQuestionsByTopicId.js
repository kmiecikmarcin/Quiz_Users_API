async function findQuestionsByTopicId(Questions, topic) {
  const questions = await Questions.findAll({ where: { id_topic: topic } });
  if (questions.length !== 0) {
    return questions.questions + questions.correctAnswer;
  }
  return null;
}

module.exports = findQuestionsByTopicId;
