const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
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
        unique: true,
        allowNull: false,
        field: 'public_id'
    },
    idRole: {
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4,
        model: 'TypesOfRoles',
        key: 'id',
        field: 'id_role'
    },
    name: {
        type: DataTypes.STRING(14),
        unique: true,
        allowNull: false,
        field: 'user_name'
    },
    password: {
        type: DataTypes.STRING(20),
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

TypesOfRoles.hasMany(Users);

module.exports = Users;
