const findQuestionByName = require('./findQuestionByName');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findUserRoleById = require('./findUserRoleById');

async function updateQuestion(Questions, oldQuestion, newQuestion,
  correctAnswerData, firstAnswerData, secondAnswerData, thirdAnswerData, user, topic) {
  const checkQuestion = await findQuestionByName(Questions, oldQuestion);
  if (checkQuestion !== null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Nauczyciel') {
      const result = await Questions.update({
        question: newQuestion,
        correctAnswer: correctAnswerData,
        firstAnswer: firstAnswerData,
        secondAnswer: secondAnswerData,
        thirdAnswer: thirdAnswerData,
        id_user: user.id,
        id_topic: topic,
      }, {
        where: { question: oldQuestion },
      });
      if (result !== null) {
        return result;
      }
      return null;
    }
    const response = false;
    return response;
  }
  return null;
}

module.exports = updateQuestion;
