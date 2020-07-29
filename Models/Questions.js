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

Users.hasMany(Questions, {
    foreignKey: {
        allowNull: false,
        name: 'id_user'
    }
});
Topics.hasMany(Questions, {
    foreignKey: {
        allowNull: false,
        name: 'id_topic'
    }
});

module.exports = Questions;