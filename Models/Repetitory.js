const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const Users = require('./Users');
const SubTopics = require('./SubTopics');

const Repetitory = sequelize.define('Repetitory', {
    id: {
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_repetitory'
    },
    title: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: false,
        field: 'title_of_description'
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'description'
    }
},{
    timestamps: true 
});

Users.hasMany(Repetitory, {
    foreignKey: {
        allowNull: false,
        name: 'id_user'
    }
});
SubTopics.hasMany(Repetitory, {
    foreignKey: {
        allowNull: false,
        name: 'id_subtopic'
    }
});

module.exports = Repetitory;