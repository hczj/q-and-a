const Sequelize = require('sequelize');
const db = require('../db');

const Feedback = db.define('feedback', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 5
    },
  },
  content: {
    type: Sequelize.TEXT
  }
}, {
  tableName: 'feedback'
})

module.exports = Feedback
