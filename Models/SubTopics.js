const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const Topics = require('./Topics');
const Users = require('./Users');

const SubTopics = sequelize.define('SubTopics', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_subtopic'
    },
    name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        field: 'name_of_subtopic'
    }
},{
    timestamps: true
});

Users.hasMany(SubTopics, {
    foreignKey: {
        allowNull: false,
        name: 'id_user'
    }
});
Topics.hasMany(SubTopics, {
    foreignKey: {
        allowNull: false,
        name: 'id_topic'
    }
});

module.exports = SubTopics;