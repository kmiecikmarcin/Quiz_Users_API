const Sequelize = require('sequelize');
const db = require('../bin/database');

const ChceckUserName = db.define('users', {
    user_name: {
        type: Sequelize.DataTypes.STRING,
        field: 'user_name'
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
ChceckUserName.removeAttribute('id');
module.exports = ChceckUserName;