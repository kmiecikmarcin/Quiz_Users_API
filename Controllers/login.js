const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function login(res,userPassword,user_password,userId,userName,userIdRole)
{
    bcrypt.compare(userPassword, user_password, function(err,result)
    {
        if(result == true)
        {
            jwt.sign({publicId: userId, name: userName, id_role: userIdRole}, 'secretKey', (err,token) => 
            {
                return res.json({token});
            });      
        }
        else
        {
            return res.json({Komunikat: "Hasło jest niepoprawne!"});
        }
    });  
}


module.exports = login;