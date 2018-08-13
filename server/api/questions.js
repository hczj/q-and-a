const router = require('express').Router();
const { Question, Topic, UserTopic, User } = require('../db/models');
const Op = require('sequelize').Op;
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (err) {
    next(err);
  }
});

router.get('/:myId', async (req, res, next) => {
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
      const questions = await Question.findAll({
        where: { categoryId: { [Op.or]: categoryIds } },
        include: [{ model: Topic }, { model: User }]
      });

      res.json(questions);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      where: { categoryId: req.params.categoryId },
      include: [Topic]
    });
    res.json(questions);
  } catch (err) {
    next(err);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      where: { userId: req.params.userId }
    });
    res.json(questions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    req.body.topicIds.map(async topic => {
      await UserTopic.findOrCreate({
        where: {
          userId: req.body.myId,
          topicId: topic
        }
      });
    });

    const newQuestion = await Question.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.myId,
      categoryId: req.body.categoryId
    });

    await newQuestion.setTopics(req.body.topicIds);

    res.status(201).json(newQuestion);
  } catch (err) {
    next(err);
  }
});
