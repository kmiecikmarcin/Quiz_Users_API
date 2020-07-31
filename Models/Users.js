const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TypesOfRoles = require('./TypesOfRoles');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_user'
    },
    publicId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
        field: 'public_id'
    },
    name: {
        type: DataTypes.STRING(14),
        unique: true,
        allowNull: false,
        field: 'user_name'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_password'
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        field: 'email'
    }
}, {    
        timestamps: true   
});

TypesOfRoles.hasMany(Users, {
    foreignKey: {
        allowNull: false,
        name: 'id_role'
    }
});

module.exports = Users;
