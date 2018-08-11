const router = require('express').Router();
const { Category, Topic, UserTopic } = require('../db/models');
const Op = require('sequelize').Op;
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({ include: [Topic] });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId, {
      include: [Topic]
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.get('/user/:myId', async (req, res, next) => {
  try {
    const topics = await UserTopic.findAll({
      where: { userId: req.params.myId },
      attributes: ['topicId'],
      include: [{ model: Topic, attributes: ['categoryId'] }]
    });

    if (topics.length === 0) {
      return res.json([]);
    } else {
      const categoryIds = topics.map(item => item.topic.categoryId);
      const categories = await Category.findAll({
        where: {
          id: { [Op.or]: categoryIds }
        }
      });
      res.json(categories);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name
    });
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
});
