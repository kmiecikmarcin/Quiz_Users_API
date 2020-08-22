const checkTopicByName = require('./checkTopicByName');
const checkQuestionByName = require('./checkQuestionByName');
const findUserRoleById = require('./findUserRoleById');
const Topics = require('../Models/Topics');
const TypesOfRoles = require('../Models/TypesOfRoles');

async function deleteQuestion(Questions, topicName, question, user) {
  const checkTopic = await checkTopicByName(Topics, topicName);
  if (checkTopic !== null) {
    const checkQuestion = checkQuestionByName(Questions, question);
    if (checkQuestion !== null) {
      const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
      if (userRole === 'Administrator') {
        const result = await Questions.destroy({
          where: {
            id_question: question.id,
            name: question,
          },
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
  return null;
}

module.exports = deleteQuestion;
