async function findQuestionsByTopicId(Questions, topic) {
  const questions = await Questions.findAll({ where: { id_topic: topic } });
  if (questions.length !== 0) {
    const response = questions.map(res => res.id_topic);
    return response;
  }
  return null;
}

module.exports = findQuestionsByTopicId;
