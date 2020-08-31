/* eslint-disable no-plusplus */
async function findQuestionsByTopicId(Questions, topic) {
  const questions = await Questions.findAll({ where: { id_topic: topic } });
  if (questions.length !== 0) {
    let response = {};
    for (let i = 1; i < 6; ++i) {
      response = questions[i];
    }
    return response;
  }
  return null;
}

module.exports = findQuestionsByTopicId;
