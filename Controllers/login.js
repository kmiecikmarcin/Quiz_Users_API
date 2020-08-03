const bcrypt = require('bcrypt');

function login(res,userPassword,user_password)
{
    bcrypt.compare(userPassword, user_password, function(err,result)
    {
        if(result == true)
        {
            return res.json({Komunikar: "Zalogowano!"});
        }
        else
        {
            return res.json({Komunikat: "Hasło jest niepoprawne!"});
        }
    });  
}

module.exports = login;