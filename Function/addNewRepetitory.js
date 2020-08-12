const findRepetitoryByName = require('./findRepetitoryByName');
const TypesOfRoles = require('../Models/TypesOfRoles');
const findUserRoleById = require('./findUserRoleById');

async function addNewRepetitory(Repetitory, titleOfRepetitory, repetitoryData, user, subTopic) {
  const findRepetitory = await findRepetitoryByName(Repetitory, titleOfRepetitory);
  if (findRepetitory === null) {
    const userRole = await findUserRoleById(TypesOfRoles, user.id_role);
    if (userRole === 'Nauczyciel') {
      Repetitory.create({
        title: titleOfRepetitory,
        data: repetitoryData,
        id_user: user.id,
        id_subtopic: subTopic,
      });
      return 'Repetitory has been added!';
    } if (userRole !== 'Nauczyciel') {
      return 'You dont have perrmission for that operation!';
    }
  }
  return 'Repetitory exists!';
}

module.exports = addNewRepetitory;
