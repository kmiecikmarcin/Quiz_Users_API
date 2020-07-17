const Sequelize = require('sequelize');
const db = require('../bin/database');

const DeleteUser = db.define('users', {
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
    user_password: {
         type: Sequelize.DataTypes.STRING,
         field: 'user_password'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = DeleteUser;