const express = require('express');
const router = express.Router();
const {Client} = require('pg');

const client = {
    user: "postgres",
    password: "axSIFux9",
    host: "localhost",
    port: 5432,
    database: "Quiz_Users"
}

var result;

async function userTryToLogIn(userName,userPassword)
{
    const db = new Client(client)
    try
    {
        await db.connect()
        console.log("Connection successfully.")
        const {rows} = await db.query("Select id_user from users where user_name=($1) AND user_password=($2)", [userName,userPassword])
        results = (rows)
        return JSON.stringify(result)
    }
    catch(error)
    {
        console.log(`Something wrong happend ${error}`)
    }
    finally
    {
        db.end()
        console.log("Client disconnected successfully.")
    }
}

router.get('/loginUserInApplication', (req,res) => {
    userTryToLogIn(req.body.username,req.body.userpassword);
    console.log(result)
    res.send(result);
})

module.exports = router;