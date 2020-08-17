/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const array = ['Uczeń', 'Nauczyciel', 'Administrator'];

function fillTypesOfRoles(TypesOfRoles) {
  for (let i = 0; i < array.length; i++) {
    TypesOfRoles.findOne({ where: { name: array[i] } })
      .then((roles) => {
        if (roles === null) {
          TypesOfRoles.create({
            name: array[i],
          });
          console.log('Add new role!');
        } else {
          console.log('Type of user role exist!');
        }
      });
  }
}

module.exports = fillTypesOfRoles;
