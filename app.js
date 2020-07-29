const express = require('express');
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');
//const TypeOfRoles = require('./Models/TypesOfRoles');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres' 
});

sequelize.sync({force: true})
  .then(() => {
    console.log(`Database & tables created!`);
  });

const port = process.env.PORT || 3000

//app.use('/users', Routes)

app.listen(port)

module.exports = app;
module.exports = sequelize;
