const Sequelize = require('sequelize');
const db = require('../bin/database');

const UsersLogin = db.define('login', {
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
    timestamps: false
});

module.exports = UsersLogin;