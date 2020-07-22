const Sequelize = require('sequelize');
const db = require('../bin/database');

const UserName = db.define('users', {
    user_name: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'user_name'
    },
    user_password: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'user_password'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
UserName.removeAttribute('id');
module.exports = UserName;