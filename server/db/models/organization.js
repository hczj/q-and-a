const Sequelize = require('sequelize');
const db = require('../db');

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate : {
      notEmpty: true,
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://dummyimage.com/100x100'
  },
})

module.exports = Organization
