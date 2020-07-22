const Sequelize = require('sequelize');
const db = require('../bin/database');

const ChangeUserEmail = db.define('users', {
    email: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'email'
    },
    user_password: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'user_password'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
ChangeUserEmail.removeAttribute('id');
module.exports = ChangeUserEmail;