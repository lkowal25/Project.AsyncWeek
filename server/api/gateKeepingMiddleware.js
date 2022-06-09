// store as all functions that will act as middlware between requests and reesponse
const {
  models: { User, ZipCode },
} = require('../db');

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

const searchPastAPI = async (req, res, next) => {
  try {
    const zipcodeList = await ZipCode.findOne({
      where: {
        zipcode: req.params.zipcode,
        radius: req.params.radius,
        units: req.params.units,
      },
    });

    if (!zipcodeList) {
      next();
    } else {
      req.zipcodeList = zipcodeList;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
};
