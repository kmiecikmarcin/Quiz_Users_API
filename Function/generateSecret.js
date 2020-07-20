const Speakeasy = require('speakeasy');

secretKey = function()
{
    var secret = Speakeasy.generateSecret({length: 20});
    return secret.base32;
};

module.exports.secretKey = secretKey;