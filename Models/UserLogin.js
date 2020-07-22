const Sequelize = require('sequelize');
const db = require('../bin/database');

const UserLogin = db.define('users', {
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

module.exports = UserLogin;