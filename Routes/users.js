const express = require('express');
const router = express.Router();
const {Client} = require('pg');
require('dotenv/config')

const client = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.PORT || 5432,
    database: process.env.DATABASE_NAME
}

router.get('/loginUserInApplication', async (req,res) => {  
        const db = new Client(client)
        try
        {
            await db.connect()
            console.log("Connection successfully.")
    
            const results = await db.query("Select id_user,id_role from users where user_name=($1) AND user_password=($2)", [req.body.userName,req.body.userPassword])
            var response = (results.rows)
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