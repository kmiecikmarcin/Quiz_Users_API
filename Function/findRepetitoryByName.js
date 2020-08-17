async function findRepetitoryByName(Repetitory, titleOfRepetitory) {
  const result = await Repetitory.findOne({ where: { title: titleOfRepetitory } });
  if (result !== null) {
    return result;
  }
  return null;
}

module.exports = findRepetitoryByName;
