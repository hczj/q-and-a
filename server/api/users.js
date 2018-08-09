const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

//GET ROUTES

router.get('/:userId', async (req,res, next) => {
  try{
    const user = await User.findById(req.params.userId)
    res.json(user.dataValues)
  } catch (err) {
    next(err);
  }
})


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//POST ROUTE

router.post('/', async (req, res, next) => {
  try{
    console.log("req.body is ", req.body)
    const user  = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err);
  }
})
