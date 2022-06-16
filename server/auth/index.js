const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('../api/gateKeepingMiddleware');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await User.authenticate({ username, password });
    res.cookie('token', token, {
      httpOnly: true, //prevents JS from reading
      sameSite: 'strict', //prevents CSRF (Cross Script Req Forgery)
      // secure: true,       //req HTTPS (disabled for dev)
      signed: true, //not a property middleware needs to sign
    });

    res.send('User has logged in successfully');
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.create({ username, password });

    const token = await user.generateToken();

    res.cookie('token', token, {
      httpOnly: true, //prevents JS from reading
      sameSite: 'strict', //prevents CSRF (Cross Script Req Forgery)
      // secure: true,       //req HTTPS (disabled for dev)
      signed: true, //not a property middleware needs to sign
    });
    res.send('Signed up the user');
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
    if (req.user) {
      res.send(req.user);
    } else {
      res.sendStatus(404);
    }
  } catch (ex) {
    next(ex);
  }
});

router.delete('/', requireToken, async (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true, //prevents JS from reading
    sameSite: 'strict', //prevents CSRF (Cross Script Req Forgery)
    // secure: true,       //req HTTPS (disabled for dev)
    signed: true, //not a property middleware needs to sign
  });

  res.send('successfully logged out');
});
