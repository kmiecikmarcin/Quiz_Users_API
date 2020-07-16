const Sequelize = require('sequelize');
const db = require('../bin/database');
const { timeStamp } = require('console');

const Users = db.define('users', {
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
         type: Sequelize.DataTypes.STRING,
         field: 'user_name'
     },
     user_password: {
         type: Sequelize.DataTypes.STRING,
         field: 'user_password'
     },
     email: {
         type: Sequelize.DataTypes.STRING,
         field: 'email'
     },
}, {
    timestamps: false
});

module.exports = Users;