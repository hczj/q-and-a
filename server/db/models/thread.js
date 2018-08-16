const Sequelize = require('sequelize');
const db = require('../db');

const Thread = db.define('thread', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = Thread;
