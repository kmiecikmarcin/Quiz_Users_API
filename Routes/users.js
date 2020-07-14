const express = require('express');
const router = express.Router();
const {Client} = require('pg');

const client = new Client({
    user: "postgres",
    password: "axSIFux9",
    host: "localhost",
    port: 5432,
    database: "Quiz_Users"
})

async function userTryToLogIn(userName,userPassword)
{
    try
    {
        await client.connect()
        console.log("Connection successfully.")
        const {rows} = await client.query("Select id_user from users where user_name=($1) AND user_password=($2)", [userName,userPassword])
        results = (rows)
        client.end()
    }
    catch(error)
    {
        console.log(`Something wrong happend ${error}`)
    }
    finally
    {
        client.end()
        console.log("Client disconnected successfully.")
    }
}

router.get('/loginUserInApplication', (req,res) => {
    client
    .connect()
    .then(() => console.log('Connected'))
    .catch(err => console.error('error',err.stack))
    
    //userTryToLogIn(req.body.username,req.body.userpassword);
    res.send(results)
})

module.exports = router;