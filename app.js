const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./config/database');
const TypesOfRoles = require('./Models/TypesOfRoles');
const Users = require('./Models/Users');
const Subjects = require('./Models/Subjects');
const Topics = require('./Models/Topics');
const SubTopics = require('./Models/SubTopics');
const Questions = require('./Models/Questions');
const Repetitory = require('./Models/Repetitory');
const RoutesUsers = require('./Routes/users');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({force: false})
.then(() => {
  console.log(`Database & tables created. Probably!`);
});

const port = process.env.PORT || 3000

app.use('/api/v1', RoutesUsers);

app.listen(port)

module.exports = app;