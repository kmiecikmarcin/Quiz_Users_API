const TypesOfRoles = require('../Models/TypesOfRoles');
const findQuestionByName = require('./findQuestionByName');
const findUserRoleById = require('./findUserRoleById');

async function addNewQuestion(Questions, questionData, correctAnswerData,
  firstAnswerData, secondAnswerData, thirdAnswerData, user, topic) {
  const checkQuestion = await findQuestionByName(Questions, questionData);
  if (checkQuestion === null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole !== 'Uczeń') {
      const result = await Questions.create({
        question: questionData,
        correctAnswer: correctAnswerData,
        firstAnswer: firstAnswerData,
        secondAnswer: secondAnswerData,
        thirdAnswer: thirdAnswerData,
        id_user: user.id,
        id_topic: topic,
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

module.exports = addNewQuestion;
