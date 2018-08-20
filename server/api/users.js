const router = require('express').Router();
const {
  User,
  Topic,
  Question,
  UserTopic,
  Category,
  Thread,
  Message,
  Organization
} = require('../db/models');
const { isAdmin } = require('../utils');
const Op = require('sequelize').Op;
module.exports = router;

// get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// find a specific user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// get all topics a user is interested in
router.get('/:userId/topics', async (req, res, next) => {
  try {
    const [user] = await User.findAll({
      where: { id: req.params.userId },
      include: Topic
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// get all categories you are interested in
router.get('/me/categories', async (req, res, next) => {
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
      const categories = await Category.findAll({
        where: {
          id: { [Op.or]: categoryIds }
        },
        include: [Topic]
      });
      res.json(categories);
    }
  } catch (err) {
    next(err);
  }
});

// get all questions you have asked
router.get('/me/questions', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      where: {
        userId: req.user.dataValues.id,
        isActive: true
      },
      include: [{ model: Topic }, { model: User }]
    });
    res.json(questions);
  } catch (err) {
    next(err);
  }
});

// get a specific user
router.get('/:userId/threads', async (req, res, next) => {
  try {
    const myId = req.params.userId;
    const threads = await Thread.findAll({
      where: { [Op.or]: [{ receiverId: myId }, { senderId: myId }] },
      include: {
        model: Message
      },
      order: [[Message, 'id', 'ASC']]
    });
    res.json(threads);
  } catch (err) {
    next(err);
  }
});

// edit a specific user
router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    const { data: user } = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        isTeacher: req.body.isTeacher,
        password: req.body.password
      },
      {
        where: { id: req.params.userId },
        returning: true,
        plain: true
      }
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// update your topics
router.put('/me/topics', (req, res, next) => {
  try {
    req.body.topicIds.map(async topic => {
      await UserTopic.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          topicId: topic
        }
      });
    });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// remove a user topic
router.delete('/me/topics/:topicId', async (req, res, next) => {
  try {
    await UserTopic.destroy({
      where: {
        userId: req.user.dataValues.id,
        topicId: req.params.topicId
      }
    });

    const topic = await Topic.findById(req.params.topicId);
    res.status(201).send(topic);
  } catch (err) {
    next(err);
  }
});

// delete a user
router.delete('/:userId', isAdmin, async (req, res, next) => {
  const userId = +req.params.userId;
  try {
    await User.destroy({ where: { id: userId } });
    res.json(userId);
  } catch (err) {
    next(err);
  }
});
