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
    idTopic: {
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4,
        model: 'Topics',
        key: 'id',
        field: 'id_topic'
    },
    publicId: {
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4,
        model: 'Users',
        key: 'public_id',
        field: 'public_id'
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

Users.hasMany(SubTopics);
Topics.hasMany(SubTopics);

module.exports = SubTopics;