const router = require('express').Router();
const { User, Topic, Organization, Category } = require('../db/models/');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [{ model: Topic }, { model: Organization, include: [Category] }]
    });

    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const user = await User.findByPk(newUser.id, {
      include: [{ model: Topic }, { model: Organization, include: [Category] }]
    });
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.dataValues.id, {
        include: [
          { model: Topic },
          { model: Organization, include: [Category] }
        ]
      });
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
});
