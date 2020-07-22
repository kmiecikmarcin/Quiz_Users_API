const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

const { body , validationResult } = require('express-validator');

const secret = require('../Function/generateSecret');
const token = require('../Function/generateToken');

const UserLogin = require('../Models/UserLogin');
const CheckUserName = require('../Models/CheckUserName');

//skonczone
router.get('/loginUserInApplication',
[
body('userName').isLength({min:4, max:20}),
body('userName').isAlphanumeric(),
body('userName').custom(value => !/\s/.test(value)),
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
        UserLogin.findOne({where: {user_name: req.body.userName, user_password: req.body.userPassword}})
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

//skonczone, dodac tylko hashowanie haseł
router.post('/addNewUser', 
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
]
,(req,res) => {
    const error = validationResult(req);
    const data = {
        id_role: 2,
        user_name: req.body.userName,
        user_password: req.body.userPassword,
        email: req.body.userEmail
    }

    let = {id_role,user_name,user_password,email} = data;

    if(!error.isEmpty() || req.body.checkUserPassword != req.body.userPassword)
    {
        return res.json({Błąd: "Dane zostały wprowadzone błędnie!"});
    }
    else
    {
        UserLogin.findOne({where: {user_name: req.body.userName}})
        .then((users) => 
        {
            if(users == null)
            {      
                users = null;         
                UserLogin.findOne({where: {email: req.body.userEmail}})
                .then((users) => 
                {
                    if(users == null)
                    {
                        UserLogin.create({id_role,user_name,user_password,email})
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
        .catch(err => res.json({err}));              
    }
});

//skonczone
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
        UserLogin.findOne({where: {id_user: req.body.idUser, id_role: req.body.idRole, user_password: req.body.userPassword}})
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
                    UserLogin.destroy({where: {id_user: req.body.idUser, id_role: req.body.idRole, user_password: req.body.userPassword}})
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
        .catch(err => res.json({err}));       
    }
});

//skonczone
router.put('/changeUserName',
[
body('idUser').isNumeric(),
body('idUser').custom(value => !/\s/.test(value)),
body('newUserName').isLength({min:4,max:20}),
body('newUserName').isAlphanumeric(),
body('newUserName').custom(value => !/\s/.test(value)),
body('userPassword').isLength({min:6}), 
body('userPassword').custom(value => !/\s/.test(value)),
body('checkUserPassword').exists(),
body('checkUserPassword').custom(value => !/\s/.test(value)),
],
(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.json({Błąd: "Hasło zostało wprowadzone błędnie!"});
    }
    else if(req.body.checkUserPassword != req.body.userPassword)
    {
        return res.json({Błąd: "Podane hasła są różne!"});
    }
    else
    {
        UserLogin.findOne({where: {id_user: req.body.idUser, user_password: req.body.userPassword}})
        .then(users => {
            if(users == null)
            {
                return res.json({Błąd: "Użytkownik nie istnieje!"})
            }
            else
            {       
                users = null;       
                UserLogin.findOne({where: {user_name: req.body.newUserName}})               
                .then(users => {console.log(users)
                    if(users != null)
                    {
                        return res.json({Błąd: "Użytkownik o podanej nazwie już istnieje!"});
                    }
                    else
                    {
                        UserLogin.update({user_name: req.body.newUserName},{where:{id_user: req.body.idUser, user_password: req.body.userPassword}})
                        .then(() => res.json({Komunikat: "Login zmieniono pomyślnie!"})); 
                    }
                })
                .catch(err => res.json({err}));                
            }         
        })
        .catch(err => res.json({err}));      
    }
});

//skonczone
router.put('/forgotUserName',
[
body('userEmail').isEmail(),
body('userEmail').custom(value => !/\s/.test(value)),
body('userEmail').isLength({min:4}),
],
(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.json({Błąd: "Email został błędnie wprowadzony!"});
    }
    else
    {
        CheckUserName.findOne({where: {email: req.body.userEmail}})
        .then(users => 
        {
            console.log(users);
            if(users == null)
            {
                return res.json({Błąd: "Użytkownik o podanym emailu nie istnieje!"});
            }
            else
            {                
                let transporter = nodemailer.createTransport({
                    service: process.env.AUTOMATIC_SERVICE_NAME,
                    secure: true,
                    auth: {
                        type: process.env.AUTOMATIC_TYPE,
                        clientId: process.env.AUTOMATIC_CLIENTID,
                        clientSecret: process.env.AUTOMATIC_CLIENTSECRET,
                        user: process.env.AUTOMATIC_EMAIL_ADRESS,
                        pass: process.env.AUTOMATIC_EMAIL_PASSWORD,
                        refreshToken: process.env.AUTOMATIC_REFRESHTOKEN,         
                    }
                });                
                let mailOptions = {
                    from: '"Quiz - Technikum kretywne" <automatic.quiz.api@gmail.com>',
                    to: req.body.userEmail,
                    subject: 'Forgotten login!',
                    text: `${users.user_name}`,
                };
            
                transporter.sendMail(mailOptions, (error,info) => {
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            
                return res.json({Komunikat: "Mail z nazwą użytkownika został wysłany!"});
            }
        })
        .catch(err => res.json({err}));
    }
});

//skonczone, dodac sprawdzenie kodu weryfikacyjnego
router.put('/forgotUserPassword',
[
body('userEmail').isEmail(),
body('userEmail').custom(value => !/\s/.test(value)),
body('userEmail').isLength({min:4}),
],
(req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.json({Błąd: "Dane zostały wprowadzone błędnie!"});
    }
    else
    {
        CheckUserEmail.findOne({where: {email: req.body.userEmail}})
        .then((users) => 
        {
            if(users != null)
            {
                var secretKey = secret.secretKey()  
                let transporter = nodemailer.createTransport({
                    service: process.env.AUTOMATIC_SERVICE_NAME,
                    secure: true,
                    auth: {
                        type: process.env.AUTOMATIC_TYPE,
                        clientId: process.env.AUTOMATIC_CLIENTID,
                        clientSecret: process.env.AUTOMATIC_CLIENTSECRET,
                        user: process.env.AUTOMATIC_EMAIL_ADRESS,
                        pass: process.env.AUTOMATIC_EMAIL_PASSWORD,
                        refreshToken: process.env.AUTOMATIC_REFRESHTOKEN,         
                    }
                });
                var newToken = token.generateToken(secretKey)
                let mailOptions = {
                    from: '"Quiz - Technikum kretywne" <automatic.quiz.api@gmail.com>',
                    to: req.body.userEmail,
                    subject: 'Reset your password!',
                    text: `${newToken.token}`,
                };
            
                transporter.sendMail(mailOptions, (error,info) => {
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
            
                return res.json({Komunikat: "Mail z linkiem został wysłany!"});
            }
            else
            {
                return res.json({Komunikat: "Użytkownik o takim emailu nie istnieje!"});
            }
        })
        .catch(err => res.json({err}));
    }
});

router.put('/changeUserEmail',
[
body('idUser').isNumeric(),
body('idUser').custom(value => !/\s/.test(value)),
body('newUserEmail').isEmail(),
body('newUserEmail').custom(value => !/\s/.test(value)),
body('newUserEmail').isLength({min:4}),
body('userPassword').isLength({min:6}), 
body('userPassword').custom(value => !/\s/.test(value)), 
body('checkUserPassword').exists(),
body('checkUserPassword').custom(value => !/\s/.test(value)),
],
(req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        res.json({Komunikat: "Hasło zostało wprowadzone niepoprawnie!"});
    }
    else if(req.body.checkUserPassword != req.body.userPassword)
    {
        res.json({Komunikat: "Hasła nie są identyczne!"});
    }
    else
    {
        UserLogin.findOne({where: {id_user: req.body.idUser, user_password: req.body.userPassword}})
        .then(() => {

        })
        .catch(err => res.json({err}));
    }
});

module.exports = router;