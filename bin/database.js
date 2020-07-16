const Sequelize = require('sequelize');
require('dotenv').config()
module.exports = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    timestmaps: false
});