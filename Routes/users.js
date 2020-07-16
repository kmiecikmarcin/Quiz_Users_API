const express = require('express');
const router = express.Router();

require('dotenv').config()

const { body , validationResult } = require('express-validator')

const db = require('../bin/database')
const Users = require('../Models/UserLogin')

router.get('/loginUserInApplication',
[
body('userName').isLength({min:4, max:20}),
body('userPassword').isLength({min:6}),
],

(req,res) => 
{
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.json({Błąd: "Podany login lub hasło jest za krótkie!"});
    }
    else
    {
        Users.findOne({where: {user_name: req.body.userName, user_password: req.body.userPassword}})
        .then(users => {
            if(users == null)
            {
                return res.json({Błąd: "Użytkownik nie istnieje!"})
            }
            else
            {
                return res.json(users);
            }         
        })
        .catch(err => console.log(err));      
    }
});

/*(router.post('/addNewUserToDatabase', async (req,res) => {
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
});*/

module.exports = router;