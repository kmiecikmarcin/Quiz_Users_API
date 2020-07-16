const Sequelize = require('sequelize');
const db = require('../bin/database');

const AddNewUser = db.define('users', {
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
AddNewUser.removeAttribute('id');
module.exports = AddNewUser;