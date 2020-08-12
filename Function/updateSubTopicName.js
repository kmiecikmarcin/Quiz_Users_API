const findSubTopicByName = require('./findSubTopicByName');
const Users = require('../Models/Users');

async function updateSubTopicName(SubTopics, oldSubTopicName, newSubTopicName) {
  const findSubTopic = await findSubTopicByName(SubTopics, oldSubTopicName);
  if (findSubTopic !== null) {
    const result = await SubTopics.update({
      name: newSubTopicName,
      id_user: Users,
    }, {
      where: { id_subtopic: findSubTopic.id },
    });
    if (result !== null) {
      return 'Subtopic updated!';
    }
    return 'Something went wrong!';
  }
  return 'Subtopic doesnt exists!';
}

module.exports = updateSubTopicName;
