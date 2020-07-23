const express = require('express');
const bodyParser = require('body-parser')
const Routes = require('./Routes/users');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

app.use('/users', Routes)

app.listen(port)

module.exports = app;