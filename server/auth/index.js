const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('../api/gateKeepingMiddleware');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.send({ token: await User.authenticate({ username, password }) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.create({ username, password });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', requireToken, async (req, res, next) => {
  try {
    if (!req.user) error.status(400).send('you tried a thing you did');
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});
