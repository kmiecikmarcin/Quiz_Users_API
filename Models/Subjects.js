const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subjects = sequelize.define('Subjects', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
    field: 'id_subject',
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    field: 'name_of_subject',
  },
}, {
  timestamps: true,
});

module.exports = Subjects;
