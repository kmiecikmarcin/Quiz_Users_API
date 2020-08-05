/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const TypesOfRoles = require('./Models/TypesOfRoles');
const Subjects = require('./Models/Subjects');
const RoutesUsers = require('./Routes/users');
const fillTypesOfRoles = require('./Controllers/fillUsersRoles');
const fillSubjects = require('./Controllers/fillSubjects');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({ force: true })
  .then(() => {
    fillTypesOfRoles(TypesOfRoles);
    fillSubjects(Subjects);
    console.log('Database & tables created. Probably!');
  });

const port = process.env.PORT || 3000;

app.use('/api/v1', RoutesUsers);

app.listen(port);

module.exports = app;
