const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  zipcode: {
    type: Sequelize.INTEGER,
  },
  nationality: {
    type: Sequelize.STRING,
  },
});

module.exports = Restaurant;
