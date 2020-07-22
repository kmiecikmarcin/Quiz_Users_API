const Sequelize = require('sequelize');
const db = require('../bin/database');

const ForgotUserName = db.define('users', {
    user_name: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'user_name'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
ForgotUserName.removeAttribute('id');
module.exports = ForgotUserName;