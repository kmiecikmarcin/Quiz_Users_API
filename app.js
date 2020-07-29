const express = require('express');
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const sequelize = new Sequelize('database', 'username', 'secretpassword', {
    host: 'localhost',
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