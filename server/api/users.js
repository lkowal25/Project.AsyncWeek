const router = require('express').Router();
const {
  models: { User },
} = require('../db');

const { requireToken } = require('./gateKeepingMiddleware');

module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    console.log('users API line 12 req user', req.user);
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'zipcode'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
