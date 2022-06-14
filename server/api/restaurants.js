const router = require('express').Router();
const { default: axios } = require('axios');
const {
  models: { User, Restaurant, Food },
} = require('../db');
module.exports = router;
const { Op } = require('sequelize');
const {
  requireToken,
  findOrCacheZCRadiusAPI,
  associateRestaurantsToUser,
} = require('./gateKeepingMiddleware');
const ZipCode = require('../db/models/ZipCode');

// GET / api / restaurants;
router.get(
  '/:userId/:zipcode/:radius/:units',
  requireToken,
  findOrCacheZCRadiusAPI,
  associateRestaurantsToUser,
  async (req, res, next) => {
    try {
      const user = req.user;
      const restaurants = await user.getRestaurants();
      if (!restaurants) res.json('');

      res.json(restaurants);
    } catch (err) {
      next(err);
    }
  }
);

//GET /api/restaurants/:restaurantId
router.get('/:restaurantId', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId);

    res.send(restaurant);
  } catch (err) {
    next(err);
  }
});

router.get('/:zipcode/:radius/:units', async (req, res, next) => {
  try {
    const { data: zipcodes } = await axios.get(
      'https://www.zipcodeapi.com/rest/3GVrasm41NNZ94E5w02d3CorHu2tCKDIW1DTPWTF5WSMMFESjEyT5UIP7dZUtvFC/radius.json/10039/5/mile'
    );
  } catch (err) {
    next(err);
  }
});

// POST /api/restaurants
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Restaurant.create(req.body));
  } catch (error) {
    next(error);
  }
});

// PUT /api/restaurants/:restaurantId
router.put('/:restaurantId', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId);
    res.send(await restaurant.update(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/restaurants/:restaurantId
router.delete('/:restaurantId', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId);
    await restaurant.destroy();
    res.send(restaurant);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
