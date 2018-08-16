const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('message', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
