const Sequelize = require('sequelize');
const db = require('../db');
// const axios = require('axios');

const ZipCode = db.define('zipcode', {
  radius: {
    type: Sequelize.INTEGER,
  },
  units: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  totalList: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
});

module.exports = ZipCode;
