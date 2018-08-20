const router = require('express').Router();
const {
  Question,
  Topic,
  UserTopic,
  User,
  OrganizationCategory
} = require('../db/models');
const Op = require('sequelize').Op;

module.exports = router;

// get all questions in categories user is associated with
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.dataValues.id);
    const { organizationId } = user;

    const categories = await OrganizationCategory.findAll({
      where: { organizationId: organizationId }
    });

    const categoryIds = await categories.map(item => item.categoryId);

    const questions = await Question.findAll({
      where: {
        isActive: true,
        categoryId: { [Op.or]: categoryIds }
      },
      include: [
        {
          model: Topic,
          attributes: ['id', 'name']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(questions);
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
          model: Topic,
          attributes: ['id', 'name']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        }
      ]
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
        description: req.body.description,
        isActive: req.body.isActive
      },
      {
        where: { id: req.params.questionId },
        returning: true,
        plain: true
      }
    );

    const question = await Question.findById(req.params.questionId, {
      include: [{ model: Topic }, { model: User }]
    });

    res.json(question);
  } catch (err) {
    next(err);
  }
});
