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

      if (!req.query.type) {
        res.json(questions);
      } else if (req.query.type === 'popular') {
        const sortQuestions = await Question.findAll({
          where: { categoryId: { [Op.or]: categoryIds } },
          include: [{ model: Topic }, { model: User }],
          order: [['votes', 'DESC']]
        });
        res.json(sortQuestions);
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
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['firstName', 'lastName', 'imageUrl', 'isActive', 'id']
          }
        },
        { model: Topic }
      ],
      order: [[Comment, 'createdAt', 'DESC']]
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

    if (req.body.vote) {
      await Question.increment('votes', {
        by: 1,
        where: { id: req.params.questionId }
      });
    }

    const question = await Question.findById(req.params.questionId, {
      include: [
        { model: Topic },
        { model: User },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['firstName', 'lastName', 'imageUrl', 'isActive', 'id']
          }
        }
      ],
      order: [[Comment, 'createdAt', 'DESC']]
    });

    res.json(question);
  } catch (err) {
    next(err);
  }
});

// create a comment
router.post('/:questionId/comment', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.content
    });

    await comment.setUser(req.user.dataValues.id);
    await comment.setQuestion(req.params.questionId);

    const question = await Question.findById(req.params.questionId, {
      include: [
        { model: Topic },
        { model: User },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['firstName', 'lastName', 'imageUrl', 'isActive', 'id']
          }
        }
      ],
      order: [[Comment, 'createdAt', 'DESC']]
    });

    res.json(question);
  } catch (err) {
    next(err);
  }
});

// delete comment
router.delete('/:questionId/comment/:commentId', async (req, res, next) => {
  try {
    await Comment.destroy({
      where: { id: req.params.commentId }
    });

    const question = await Question.findById(req.params.questionId, {
      include: [
        { model: Topic },
        { model: User },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['firstName', 'lastName', 'imageUrl', 'isActive', 'id']
          },
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    res.json(question);
  } catch (err) {
    next(err);
  }
});
