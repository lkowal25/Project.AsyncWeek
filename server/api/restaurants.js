const router = require('express').Router();
const {
  models: { User, Restaurant, Food },
} = require('../db');
module.exports = router;

// GET / api / restaurants;
router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [{ model: Food, as: 'menuItems' }],
    });
    res.send(restaurants);
  } catch (err) {
    next(err);
  }
});

// //get /api/restaurants/zipcodes
// router.get('/zipcodes', async (req, res, next) => {
//   try {
//     const restaurants = axios.get(
//       '//www.zipcodeapi.com/rest/DemoOnly00kWFcYkhjwtYUFpOW8bBY3BQwrsLZA8PGeoTdZaN7LcAnmiafeAbfYL/radius.json/11758/5/mile'
//     );
//   } catch (err) {
//     next(err);
//   }
// });

//GET /api/restaurants/:restaurantId
https: router.get('/:restaurantId', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId);

    res.send(restaurant);
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
