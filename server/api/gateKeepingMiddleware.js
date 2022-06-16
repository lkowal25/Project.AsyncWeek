// store as all functions that will act as middlware between requests and reesponse
const axios = require('axios');
const {
  models: { User, ZipCode, Restaurant },
} = require('../db');
const { Op } = require('sequelize');

//consider moving generate token here
const requireToken = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;

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

    const zipcodeList = await ZipCode.findOne({
      where: {
        zipcode: req.params.zipcode,
        radius: req.params.radius,
        units: req.params.units,
      },
    });

    req.zipCodeList = zipcodeList;

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

      //the zip code list didn't exist so we will create it
      await ZipCode.create({
        radius,
        units,
        zipcode,
        onlyZipCodes,
        distanceFromCenter,
        state,
      });
      req.zipCodeList = await ZipCode.findOne({
        where: {
          zipcode: req.params.zipcode,
          radius: req.params.radius,
          units: req.params.units,
        },
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
    const token = req.signedCookies.token;
    const user = await User.findByToken(token);

    const { onlyZipCodes } = req.zipCodeList.dataValues;

    const restaurants = await Restaurant.findAll({
      where: {
        zipcode: {
          [Op.in]: onlyZipCodes,
        },
      },
    });

    const localRestaurants = await user.setRestaurants(restaurants);
    await user.update(localRestaurants);

    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
  findOrCacheZCRadiusAPI,
  associateRestaurantsToUser,
};
