const bcrypt = require('bcrypt');

function register(res,Users,userName,userPassword,userEmail,usersId) 
{   
    bcrypt.hash(userPassword, 8, function (err,hash){
        Users.create({
            name: userName,
            password: hash,
            email: userEmail,
            id_role: usersId
        })
        .then(() => res.json({Komunikat: "Rejestracja przebiegła pomyślnie!"}))
        .catch(err => res.json({err}) );
    })
}

module.exports = register;