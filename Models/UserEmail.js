const Sequelize = require('sequelize');
const db = require('../bin/database');

const Email = db.define('users', {
    email: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'email'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
Email.removeAttribute('id');
module.exports = Email;