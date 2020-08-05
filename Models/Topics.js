const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subjects = require('./Subjects');

const Topics = sequelize.define('Topics', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
    field: 'id_topic',
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    field: 'name_of_topic',
  },
}, {
  timestamps: true,
});

Subjects.hasMany(Topics, {
  foreignKey: {
    allowNull: false,
    name: 'id_subject',
  },
});

module.exports = Topics;
