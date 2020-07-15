const express = require('express');
const router = express.Router();
const {Client} = require('pg');
require('dotenv').config()
const checkUserData = require('../Function/checkUserInDatabase')

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

            const resultsFromDatabase = await db.query(checkUserData.userLogIn(),checkUserData.takeData(req.body.userName, req.body.userPassword))
            var dataAboutUser = (resultsFromDatabase.rows)

            res.json(dataAboutUser) 
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

router.post('/addNewUserToDatabase', async (req,res) => {
    const db = new Client(client)
    try
    {

    }
    catch(error)
    {

    }
    finally
    {

    }
});

module.exports = router;