const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

const { body , validationResult } = require('express-validator');

const UsersLogin = require('../Models/UserLogin');
const AddNewUser = require('../Models/AddNewUser');
const ChceckUserName = require('../Models/CheckUserName');
const ChceckUserEmail = require('../Models/CheckUserEmail');
const DeleteUser = require('../Models/DeleteUser');

router.get('/loginUserInApplication',
[
//check userName - validation
body('userName').isLength({min:4, max:20}),
body('userName').isAlphanumeric(),
body('userName').custom(value => !/\s/.test(value)),
//check userPassword - validation
body('userPassword').isLength({min:6}),
body('userPassword').custom(value => !/\s/.test(value)),
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
        .catch(err => res.json({err}));      
    }
});

router.post('/addNewUser', 
[
//check userName - validation
body('userName').isLength({min:4,max:20}),
body('userName').isAlphanumeric(),
body('userName').custom(value => !/\s/.test(value)),
//check userPassword - validation
body('userPassword').isLength({min:6}),
body('userPassword').custom(value => !/\s/.test(value)),
// check repeated password - validation 
body('checkUserPassword').exists(),
body('checkUserPassword').custom(value => !/\s/.test(value)),
// check userEmail - validation
body('userEmail').isEmail(),
body('userEmail').custom(value => !/\s/.test(value)),
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
        return res.json({Błąd: "Dane zostały wprowadzone błędnie!"});
    }
    else
    {
        ChceckUserName.findOne({where: {user_name: req.body.userName}})
        .then((users) => 
        {
            if(users == null)
            {      
                users = null;         
                ChceckUserEmail.findOne({where: {email: req.body.userEmail}})
                .then((users) => 
                {
                    if(users == null)
                    {
                        AddNewUser.create({id_role,user_name,user_password,email})
                        .then(() => res.json({Komunikat: "Rejestracja przebiegła pomyślnie!"}))
                    }
                    else
                    {
                        return res.json({Błąd: "Użytkownik z podanym emailem już istnieje!"});
                    }
            })
            }
            else
            {
                return res.json({Błąd: "Użytkownik o podanym loginie już istnieje!"});
            }
        })              
    }
});

router.delete('/deleteUser',
[
    body('idUser').isNumeric(),
    body('idUser').custom(value => !/\s/.test(value)),
    body('userPassword').isLength({min:4}),
    body('userPassword').custom(value => !/\s/.test(value)),
],
(req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.json({Błąd: "Dane zostały wprowadzone błędnie!"});
    }
    else
    {
        DeleteUser.findOne({where: {id_user: req.body.idUser, id_role: req.body.idRole, user_password: req.body.userPassword}})
        .then(users => 
        {
            if(users != null)
            {
                if(req.body.idRole != 2)
                {
                    return res.json({Komunikat: "Administatora nie można usunąć z systemu!"});
                }
                else if(req.body.idRole == 2)
                {
                    DeleteUser.destroy({where: {id_user: req.body.idUser, id_role: req.body.idRole, user_password: req.body.userPassword}})
                    .then(() =>  
                    {
                        return res.json({Komunikat: "Użytkownik został usunięty z systemu!"});       
                    })
                    .catch((err) => res.json({err}));
                }
            }
            else
            {
                return res.json({Komunikat: "Użytkownik o wprowadzonych danych nie istnieje!"});
            }
        })       
    }
});

router.put('/changeUserName',
[

],
(req,res) => {

});

router.put('/changeUserPassword',
[

],
(req,res) => {

});

router.put('/changeUserEmail',
[
// check userEmail - validation
body('userEmail').isEmail(),
body('userEmail').custom(value => !/\s/.test(value)),
],
(req,res) => {
    const output = `
    <p>You send a request for change your password</p>
    <h3>${req.body.userEmail}</h3>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTOMATIC_MAIL_ADRESS,
            pass: rocess.env.AUTOMATIC_MAIL_PASSWORD,
        }
    });

    let mailOptions = {
        from: '"Quiz - Technikum kretywne" <atomatic.quiz.api@gmail.com>',
        to: 'sggp.kmiecik@gmail.com',
        subject: 'Change email',
        text: 'Hi, You send request!',
        html: '<b>Hello world</b>'
    };

    transporter.sendMail(mailOptions, (error,info) => {
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

module.exports = router;