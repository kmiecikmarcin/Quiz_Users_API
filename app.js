/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const TypesOfRoles = require('./Models/TypesOfRoles');
const Subjects = require('./Models/Subjects');
const Topics = require('./Models/Topics');
const SubTopics = require('./Models/SubTopics');
const Repetitory = require('./Models/Repetitory');
const Questions = require('./Models/Questions');
const RoutesUsers = require('./Routes/users');
const RoutesRepetitory = require('./Routes/repetitory');
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

app.listen(port);

module.exports = app;
