/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const TypesOfRoles = require('./Models/TypesOfRoles');
const Subjects = require('./Models/Subjects');
const RoutesUsers = require('./Routes/users');
const RoutesRepetitory = require('./Routes/repetitory');
const RoutesQuiz = require('./Routes/quiz');
const RoutesAdministrator = require('./Routes/administrator');
const fillTypesOfRoles = require('./Function/fillUsersRoles');
const fillSubjects = require('./Function/fillSubjects');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({ force: false })
  .then(() => {
    fillTypesOfRoles(TypesOfRoles);
    fillSubjects(Subjects);
    console.log('Database & tables created. Probably!');
  });

const port = process.env.PORT || 3000;

app.use('/api/v1/users', RoutesUsers);
app.use('/api/v1/repetitory', RoutesRepetitory);
app.use('/api/v1/quiz', RoutesQuiz);
app.use('/api/v1/administrator', RoutesAdministrator);

app.listen(port);

module.exports = app;
