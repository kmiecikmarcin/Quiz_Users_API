const express = require('express');
const router = express.Router();
require('dotenv').config();
const { body , validationResult } = require('express-validator');
const Users = require('../Models/Users');
const bcrypt = require('bcrypt');
const TypesOfRoles = require('../Models/TypesOfRoles');

router.get('/login', (req,res) => {
});

router.post('/register',
[
body('userName').isLength({min:4,max:20}),
body('userName').isAlphanumeric(),
body('userName').custom(value => !/\s/.test(value)),
body('userPassword').isLength({min:6}),
body('userPassword').custom(value => !/\s/.test(value)), 
body('checkUserPassword').exists(),
body('checkUserPassword').custom(value => !/\s/.test(value)),
body('userEmail').isEmail(),
body('userEmail').custom(value => !/\s/.test(value)),
body('userEmail').isLength({min:4}),
body('userEmail').isLowercase(),
],
(req,res) => {
    TypesOfRoles.findOne({where: {name: 'Uczeń'}})
    .then(users => { 
        console.log(users.id)
        console.log("Register...");
        bcrypt.hash(req.body.userPassword, 8, function (err,hash){
            Users.create({
                name: req.body.userName,
                password: hash,
                email: req.body.userEmail,
                id_role: users.id
            })
            .then(() => res.json({Komunikat: "Rejestracja przebiegła pomyślnie!"}))
            .catch(err => res.json({err}))
        });
    });
});

module.exports = router;