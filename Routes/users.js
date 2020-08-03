const express = require('express');
const router = express.Router();
require('dotenv').config();
const { check , validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Users = require('../Models/Users');
const TypesOfRoles = require('../Models/TypesOfRoles');

router.get('/login', (req,res) => {
});

router.post('/register',
[
check('userName').isLength({min:4,max:20})
.isAlphanumeric()
.trim(),

check('userPassword','checkUserPassword')
.isLength({min:6})
.custom((value, {req}) => {
    if (value !== req.body.checkUserPassword) {
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
                            bcrypt.hash(req.body.userPassword, 8, function (err,hash){
                                Users.create({
                                    name: req.body.userName,
                                    password: hash,
                                    email: req.body.userEmail,
                                    id_role: users.id
                                })
                                .then(() => res.json({Komunikat: "Rejestracja przebiegła pomyślnie!"}))
                                .catch(err => res.json({err}) );
                            });
                        });
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

