const Speakeasy = require('speakeasy');

generateToken = function(secretKey)
{
    return ({ "token" : Speakeasy.totp({
        secret: secretKey,
        encoding: "base32"
    }),
    "remaining" : (30 - Math.floor((new Date().getTime()/ 1000.0 % 30)))
});
};

module.exports.generateToken = generateToken;