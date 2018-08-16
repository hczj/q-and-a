const router = require('express').Router();
const { Category, Topic, Question, User } = require('../db/models');
module.exports = router;

// get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({ include: [Topic] });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// get a specific category
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

// create a category
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

// get all questions in a category
router.get('/:categoryId/questions', async (req, res, next) => {
  try {
    if (!req.query.type) {
      const questions = await Question.findAll({
        where: { categoryId: req.params.categoryId },
        include: [{ model: Topic }, { model: User }],
        order: [['createdAt', 'DESC']]
      });
      res.json(questions);
    } else if (req.query.type === 'popular') {
      const popularQuestions = await Question.findAll({
        where: { categoryId: req.params.categoryId },
        include: [{ model: Topic }, { model: User }],
        order: [['votes', 'DESC']]
      });
      res.json(popularQuestions);
    } else if (req.query.type === 'answered') {
      const inactiveQuestions = await Question.findAll({
        where: { categoryId: req.params.categoryId, isActive: false },
        include: [{ model: Topic }, { model: User }],
        order: [['createdAt', 'DESC']]
      });
      res.json(inactiveQuestions);
    }
  } catch (err) {
    next(err);
  }
});
