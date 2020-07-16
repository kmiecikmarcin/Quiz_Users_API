const Sequelize = require('sequelize');
const db = require('../bin/database');

const ChceckUserEmail = db.define('users', {
    email: {
        type: Sequelize.DataTypes.STRING,
        field: 'email'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
ChceckUserEmail.removeAttribute('id');
module.exports = ChceckUserEmail;