const router = require('express').Router();
const { Question, Topic, UserTopic, User, Comment } = require('../db/models');
const Op = require('sequelize').Op;

module.exports = router;

// get all questions associated with topics user is interested in
router.get('/', async (req, res, next) => {
  try {
    const topics = await UserTopic.findAll({
      where: { userId: req.user.dataValues.id },
      attributes: ['topicId'],
      include: [{ model: Topic, attributes: ['categoryId'] }]
    });

    if (topics.length === 0) {
      return res.json([]);
    } else {
      const categoryIds = topics.map(item => item.topic.categoryId);
      const questions = await Question.findAll({
        where: { categoryId: { [Op.or]: categoryIds } },
        include: [{ model: Topic }, { model: User }],
        order: [['createdAt', 'DESC']]
      });

      if (!req.query.type || req.query.type === 'newest') {
        res.json(questions);
      } else if (req.query.type === 'answered') {
        const inactiveQuestions = await Question.findAll({
          where: { categoryId: req.params.categoryId, isActive: false },
          include: [{ model: Topic }, { model: User }],
          order: [['createdAt', 'DESC']]
        });
        res.json(inactiveQuestions);
      }
    }
  } catch (err) {
    next(err);
  }
});

// find a single question
router.get('/:questionId', async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId, {
      include: [Topic]
    });
    res.json(question);
  } catch (err) {
    next(err);
  }
});

// create a question
router.post('/', async (req, res, next) => {
  try {
    req.body.topicIds.map(async topic => {
      await UserTopic.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          topicId: topic
        }
      });
    });

    const newQuestion = await Question.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.user.dataValues.id,
      categoryId: req.body.categoryId
    });

    await newQuestion.setTopics(req.body.topicIds);

    const question = await Question.findOne({
      where: { title: req.body.title },
      include: [{ model: Topic }, { model: User }]
    });

    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
});

// edit a question
router.put('/:questionId', async (req, res, next) => {
  try {
    await Question.update(
      {
        title: req.body.title,
        description: req.body.description
      },
      {
        where: { id: req.params.questionId },
        returning: true,
        plain: true
      }
    );

    const question = await Question.findById(req.params.questionId, {
      include: [
        { model: Topic },
        { model: User }
      ]
    });

    res.json(question);
  } catch (err) {
    next(err);
  }
});
