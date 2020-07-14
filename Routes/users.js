const express = require('express');
const router = express.Router();
const {Client} = require('pg');

var results = "";

const client = new Client({
    user: "postgres",
    password: "axSIFux9",
    host: "localhost",
    port: 5432,
    database: "Quiz_Users"
})

router.get('/loginUserInApplication', (req,res) => {
    client.connect()
    .then(() => console.log("Connected successfuly"))
    .then(() => client.query("select * from users"))
    .then(results => console.table(results.rows))
    .catch(e => console.log)
    .finally(() => client.end())
    res.send(results);
})

module.exports = router;