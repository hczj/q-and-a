const Sequelize = require('sequelize');
const db = require('../db');

const Session = db.define('session', {
  videoUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      isUrl: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 5
    },
  },
  feeback: {
    type: Sequelize.TEXT
  }
})

module.exports = Session
