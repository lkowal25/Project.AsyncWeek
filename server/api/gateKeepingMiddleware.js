// store as all functions that will act as middlware between requests and reesponse
const axios = require('axios');
const {
  models: { User, ZipCode, Restaurant },
} = require('../db');
const { Op } = require('sequelize');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const findOrCacheZCRadiusAPI = async (req, res, next) => {
  try {
    const { zipcode, radius, units } = req.params;
    console.log('GKM 21 ZC,', zipcode, 'radius', radius);
    const zipcodeList = await ZipCode.findOne({
      where: {
        zipcode: req.params.zipcode,
        radius: req.params.radius,
        units: req.params.units,
      },
    });

    if (!zipcodeList) {
      const { data: zipsInRadius } = await axios.get(
        `https://www.zipcodeapi.com/rest/3GVrasm41NNZ94E5w02d3CorHu2tCKDIW1DTPWTF5WSMMFESjEyT5UIP7dZUtvFC/radius.json/${zipcode}/${radius}/${units}`
      );

      const onlyZipCodes = zipsInRadius.zip_codes.reduce((acc, curVal) => {
        return [...acc, parseInt(curVal.zip_code, 10)];
      }, []);

      const distanceFromCenter = zipsInRadius.zip_codes.reduce(
        (acc, curVal) => {
          return [...acc, curVal.distance];
        },
        []
      );

      const state = zipsInRadius.zip_codes.reduce((acc, curVal) => {
        return [...acc, curVal.state];
      }, []);

      const city = zipsInRadius.zip_codes.reduce((acc, curVal) => {
        return [...acc, curVal.city];
      }, []);

      await ZipCode.create({
        radius,
        units,
        zipcode,
        onlyZipCodes,
        distanceFromCenter,
        state,
      });

      return next();
    } else {
      req.zipcodeList = zipcodeList;

      return next();
    }
  } catch (err) {
    next(err);
  }
};

const associateRestaurantsToUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    const zipcodeList = await ZipCode.findOne({
      where: {
        zipcode: req.params.zipcode,
        radius: req.params.radius,
        units: req.params.units,
      },
    });

    const { onlyZipCodes } = zipcodeList.dataValues;

    const restaurants = await Restaurant.findAll({
      where: {
        zipcode: {
          [Op.in]: onlyZipCodes,
        },
      },
    });

    const localRestaurants = await user.setRestaurants(restaurants);
    console.log('LR GKM 101, ', localRestaurants);
    await user.update(localRestaurants);
    console.log('GKM hopefully we have assigned Restaurants');
    return next();
  } catch (err) {
    console.log("didn't make it");
    next(err);
  }
};

module.exports = {
  requireToken,
  findOrCacheZCRadiusAPI,
  associateRestaurantsToUser,
};
