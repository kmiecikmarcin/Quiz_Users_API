const Sequelize = require('sequelize');
const db = require('../bin/database');

const UsersLogin = db.define('users', {
    id_user: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_user'
    },
     id_role: {
         type: Sequelize.DataTypes.INTEGER,
         foreignKey: true,
         field: 'id_role'
     },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = UsersLogin;