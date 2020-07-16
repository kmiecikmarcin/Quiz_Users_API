const express = require('express');
const router = express.Router();

require('dotenv').config();

const { body , validationResult } = require('express-validator');

const UsersLogin = require('../Models/UserLogin');
const AddNewUser = require('../Models/AddNewUser');

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
        UsersLogin.findOne({where: {user_name: req.body.userName, user_password: req.body.userPassword}})
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

router.post('/addNewUser', 
[
body('userName').isLength({min:4,max:20}),
body('userPassword').isLength({min:4}),
//body('checkUserPassword').exists(),
body('userEmail').isEmail(),
]
,(req,res) => {
    const error = validationResult(req);
    const data = {
        id_role: 1,
        user_name: req.body.userName,
        user_password: req.body.userPassword,
        email: req.body.userEmail
    }

    let = {id_role,user_name,user_password,email} = data;

    if(!error.isEmpty())
    {
        return res.json({Błąd: "Podany login lub hasło jest za krótkie!"});
    }
    else
    {
        AddNewUser.create({id_role: 1,user_name: req.body.userName, user_password: req.body.userPassword,email: req.body.userEmail})
        .then(users => {
            if(users == null)
            {
                return res.json({Błąd: "Użytkownik nie istnieje!"});
            }
            else
            {
                return res.json(users);
            }   
        })
        .catch(err => console.log(err));
    }
});

module.exports = router;