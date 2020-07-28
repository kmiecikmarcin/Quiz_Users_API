const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../app');

const Subjects = sequelize.define('Subjects',{
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement : true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_subject'
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'name_of_subject'
    },
}, {
    timestamps: true
});

module.exports = Subjects;