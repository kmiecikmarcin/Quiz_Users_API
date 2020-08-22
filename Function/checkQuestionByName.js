async function checkQuestionByName(Questions, questionName) {
  const question = await Questions.findOne({ where: { question: questionName } });
  if (question !== null) {
    return question;
  }
  return null;
}

module.exports = checkQuestionByName;
