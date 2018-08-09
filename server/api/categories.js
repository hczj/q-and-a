const router = require('express').Router();
const { Category } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.createa({
      name: req.body.name
    });
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
});
