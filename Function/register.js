/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');

async function register(res, Users, userName, userPassword, userEmail, usersId) {
    const hash = await bcrypt.hash(userPassword, 8)

    let user = await Users.create({
        name: userName,
        password: hash,
        email: userEmail,
        id_role: usersId,
    });

    if (user) {
        res.json({Komunikat: 'Registration successful'})
    } else {
        res.json({catchError: 'User or email is exists!'})
    }
}

module.exports = register;
