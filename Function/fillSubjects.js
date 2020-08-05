/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const array = ['Biologia', 'Chemia', 'Edukacja do bezpieczeństwa', 'Etyka', 'Filozofia', 'Fizyka', 'Geografia', 'Historia muzyki', 'Historia sztuki',
  'Informatyka', 'Język łacinski', 'Język mniejszości narodowej', 'Język obcy', 'Język polski', 'Język regionalny', 'Matematyka', 'Muzyka',
  'Plastyka', 'Podstawy przedsiębiorczości', 'Wiedza o społeczeństwie', 'Wychowanie do życia w rodzinie', 'Historia'];

function fillSubjects(Subjects) {
  for (let i = 0; i < array.length; i++) {
    Subjects.findOne({ where: { name: array[i] } })
      .then((subject) => {
        if (subject === null) {
          Subjects.create({
            name: array[i],
          });
          console.log('Add new subject!');
        } else {
          console.log('Subject exist!');
        }
      });
  }
}

module.exports = fillSubjects;
