const Sequelize = require('sequelize');
const db = require('../db');
// const axios = require('axios');

const Food = db.define('food', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  meatType: {
    type: Sequelize.STRING,
  },
});

module.exports = Food;
