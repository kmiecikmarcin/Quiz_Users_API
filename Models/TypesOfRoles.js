const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../app');

const Roles = sequelize.define('TypesOfRoles', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement : true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_role'
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'name_of_role'
    }
}, {
    timestamps: true
});

module.exports = Roles;