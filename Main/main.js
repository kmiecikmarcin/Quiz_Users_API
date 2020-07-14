  
const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('../Routes/users');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var port = 3000

app.use('/', Routes)

app.listen(port)

module.exports = app;