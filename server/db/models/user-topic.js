const Sequelize = require('sequelize');
const db = require('../db');

const UserTopic = db.define('userTopic', {
  proficiency: {
    type: Sequelize.ENUM,
    values: ['beginner', 'novice', 'intermediate', 'advanced', 'master'],
    defaultValue: 'beginner',
    allowNull: false
  }
})

module.exports = UserTopic;
