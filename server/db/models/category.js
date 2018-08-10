const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://dummyimage.com/200x200'
  }
});

module.exports = Category;
