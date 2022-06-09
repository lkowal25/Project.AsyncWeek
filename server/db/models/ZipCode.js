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
  onlyZipCodes: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  distanceFromCenter: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  state: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  city: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = ZipCode;
