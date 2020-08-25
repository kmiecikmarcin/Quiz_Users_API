async function findQuestionByName(Questions, questionData) {
  const result = await Questions.findOne({ where: { question: questionData } });
  if (result !== null) {
    return result;
  }
  return null;
}

module.exports = findQuestionByName;
