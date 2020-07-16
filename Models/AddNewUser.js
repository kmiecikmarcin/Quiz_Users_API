const Sequelize = require('sequelize');
const db = require('../bin/database');

const AddNewUser = db.define('users', {
    id_user: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
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
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = AddNewUser;