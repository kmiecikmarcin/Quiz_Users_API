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

router.get('/loginUserInApplication', async (req,res) => {  
        const db = new Client(client)
        try
        {
            await db.connect()
            console.log("Connection successfully.")
    
            const results = await db.query("Select id_user from users where user_name=($1) AND user_password=($2)", [req.body.userName,req.body.userPassword])
            var response = (results.rows[0])
            res.json(response) 
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
});

router.post('/addNewUserToDatabase', (req,res) => {

});

module.exports = router;