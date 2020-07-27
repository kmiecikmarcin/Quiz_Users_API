const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'secretpassword', {
    host: 'localhost',
    dialect: 'postgres'
  });

const Roles = sequelize.define('KindsOfRoles', {
    id_role: {
        type: DataTypes.UUID,
        autoIncrement : true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_role'
    },
    name_of_role: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'name_of_role'
    }
}, {
    timestamps: true
});