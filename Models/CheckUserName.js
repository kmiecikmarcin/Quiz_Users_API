const Sequelize = require('sequelize');
const db = require('../bin/database');

const CheckUserName = db.define('users', {
    user_name: {
        type: Sequelize.DataTypes.STRING,
        field: 'user_name'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
CheckUserName.removeAttribute('id');
module.exports = CheckUserName;