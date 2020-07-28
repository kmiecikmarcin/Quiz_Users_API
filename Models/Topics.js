const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../app');
const Subjects = require('./Subjects');

const Topics = sequelize.define('Topics', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement : true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'id_topic'
    },
    idSubject: {
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4,
        model: 'Subjects',
        key: 'id'
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,    
        field: 'name_of_topic'  
    }
},{
    timestamps: true
});

Subjects.hasMany(Topics);

module.exports = Topics;