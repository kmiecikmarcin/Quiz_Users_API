const express = require('express');
const router = express.Router();
const {Client} = require('pg');
require('dotenv').config()
const checkUserData = require('../Function/checkUserInDatabase')
const { body , validationResult } = require('express-validator')

const client = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.PORT || 5432,
    database: process.env.DATABASE_NAME
}

router.get('/loginUserInApplication', [
    body('userName').isLength({min:4}),
    body('userName').isLength({max:20}),
    body('userPassword').isLength({min:4}),
    body('userPassword').isLength({max:20}),
],
async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.json("Podany login lub hasło jest za krótkie!");
        }
        else
        {
            const db = new Client(client)
            try
            {
                await db.connect()
                console.log("Connection successfully.")
    
                const resultsFromDatabase = await db.query(checkUserData.userLogIn(),checkUserData.takeLoginData(req.body.userName, req.body.userPassword))
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
        }
});

router.post('/addNewUserToDatabase', async (req,res) => {
    const db = new Client(client)
    try
    {
        await db.connect()
        console.log("Connection successfully.")

        const resultsFromAddDataToDatabase = await db.query(checkUserData.addUserToDatabase(),
        checkUserData.takeDataForRegister(req.body.userName,req.body.userPassword,req.body.userEmail))
        res.json("Użytkownik został dodany do bazy danych.");
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

router.delete('/deleteUserFromDatabase', async (req,res) =>{
    const db = new Client(client)
    try
    {
        await db.connect()
        console.log("Connection successfully.")

        const resultsFromDeleteDataToDatabase = await db.query(checkUserData.deleteUserFromDatabase(),checkUserData.takeDataFroDeleteUserFromDatabase(req.body.idUser,req.body.userPassword))
        res.json("Użytkownik został usunięty do bazy danych.");
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

module.exports = router;