const Sequelize = require('sequelize');
const db = require('../bin/database');

const ForgotUserPassword = db.define('users', {
    email: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'email'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
ForgotUserPassword.removeAttribute('id');
module.exports = ForgotUserPassword;