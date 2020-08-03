const express = require('express');
const router = express.Router();
require('dotenv').config();
const { check , validationResult } = require('express-validator');
const Users = require('../Models/Users');
const TypesOfRoles = require('../Models/TypesOfRoles');
const register = require('../Controllers/register');
const login = require('../Controllers/login');
const verifyToken = require('../Function/verifyJwtToken');
const jwt = require('jsonwebtoken');

router.get('/loginToken', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretKey', (err,authData) => {
        if(err){
            res.sendStatus(404);
        }
        else
        {
            res.json({Message: 'Create', authData})
        }
    })
});

router.post('/login', 
[
check('userName').isLength({min:4,max:20})
.isAlphanumeric()
.trim(),

check('userPassword','checkUserPassword')
.isLength({min:6})
.custom((value, {req}) => {
    if (value != req.body.checkUserPassword) {
        throw new Error("Hasła sa różne!");
    } else {
        return value;
    }
})
.trim()
],
(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        res.send({Error: error});
    }
    else
    {
        Users.findOne({where: {name: req.body.userName}})
        .then(users => {
            if(users == null)
            {
                res.json({Komunikat: "Użytkownik nie istnieje!"});
            }
            else
            {
                login(res,req.body.userPassword,users.password,users.publicId,users.name,users.id_role);
            }            
        })
        .catch(err => res.json({err}) );
    }
});

router.post('/register',
[
check('userName').isLength({min:4,max:20})
.isAlphanumeric()
.trim(),

check('userPassword','checkUserPassword')
.isLength({min:6})
.custom((value, {req}) => {
    if (value != req.body.checkUserPassword) {
        throw new Error("Hasła sa różne!");
    } else {
        return value;
    }
})
.trim(), 

check('userEmail')
.isEmail()
.trim()
.isLength({min:4})
.isLowercase(),
],
(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        res.send({Error: error});
    }
    else
    {
        Users.findOne({where: {name: req.body.userName}})
        .then(users => {
            if(users == null)
            {
                Users.findOne({where: {email: req.body.userEmail}})
                .then(users => {
                    if(users == null)
                    {
                        TypesOfRoles.findOne({where: {name: 'Uczeń'}})
                        .then(users => { 
                            register(res,Users,req.body.userName,req.body.userPassword,req.body.userEmail,users.id)
                        })                       
                    }
                    else
                    {                       
                        res.json({Komunikat: "Podanym e-mail jest już przypisany do użytkownika!"});
                    }
                })
                .catch(err => res.json({err}) );
            }
            else
            {
                res.json({Komunikat: "Użytkownik o podanej nazwie już istnieje!"});
            }
        })
        .catch(err => res.json({err}) );
    }
});

module.exports = router;

