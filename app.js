const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./bin/database');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({force: true})
.then(() => {
  console.log(`Database & tables created!`);
});

const port = process.env.PORT || 3000

//app.use('/users', Routes)

app.listen(port)

module.exports = app;