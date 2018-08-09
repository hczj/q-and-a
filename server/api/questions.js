const router = require('express').Router();
const { Question } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newQuestion = await Question.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.myId,
      categoryId: req.body.categoryId
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    next(err);
  }
});
