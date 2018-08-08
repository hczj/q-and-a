const Sequelize = require('sequelize');
const db = require('../db');

const Topic = db.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate : {
      notEmpty: true,
    }
  }
})

module.exports = Topic
