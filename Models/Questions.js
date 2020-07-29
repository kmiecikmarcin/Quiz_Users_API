const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../bin/database');
const Topics = require('./Topics');
const Users = require('./Users');

const Questions = sequelize.define('Questions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_question'
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
        key: 'publicId',
        field: 'public_id'
    },
    question: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        field: 'question'
    },
    firstAnswer: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        field: 'right_answer'
    },
    secondAnswer: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        field: 'first_wrong_answer'
    },
    thirdAnswer: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        field: 'second_wrong_answer'
    },
    fourthAnswer: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        field: 'third_wrong_answer'
    }
}, {
    timestamps: true
});

Users.hasMany(Questions);
Topics.hasMany(Questions);

module.exports = Questions;