const Sequelize = require('sequelize');
const db = require('../db');

const OrganizationCategory = db.define('organizationCategory', {});

module.exports = OrganizationCategory;
