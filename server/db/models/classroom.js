const Sequelize = require('sequelize');
const db = require('../db');

const Classroom = db.define('classroom', {
  room: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Classroom
