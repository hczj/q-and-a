const router = require('express').Router();
const { Message, Thread, User } = require('../db/models');
const Op = require('sequelize').Op;

router.get('/', async (req, res, next) => {
  try {
    const myId = req.user.dataValues.id;

    const threads = await Thread.findAll({
      where: { [Op.or]: [{ receiverId: myId }, { senderId: myId }] },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['firstName', 'lastName', 'imageUrl']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['firstName', 'lastName', 'imageUrl']
        },
        {
          model: Message,
          attributes: ['id', 'content', 'createdAt', 'userId']
        }
      ],
      order: [[Message, 'id', 'ASC']],
      attributes: ['id', 'createdAt', 'senderId', 'receiverId']
    });

    res.json(threads);
  } catch (err) {
    next(err);
  }
});

router.get('/:threadId', async (req, res, next) => {
  try {
    const myId = req.user.dataValues.id;

    const thread = await Thread.findById(req.params.threadId, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['firstName', 'lastName', 'imageUrl']
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['firstName', 'lastName', 'imageUrl']
        },
        {
          model: Message,
          attributes: ['id', 'content', 'createdAt', 'userId']
        }
      ],
      order: [[Message, 'id', 'ASC']],
      attributes: ['id', 'createdAt', 'senderId', 'receiverId']
    });

    res.json(thread);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const newMessage = await Message.create({
      content: req.body.content,
      threadId: req.body.threadId,
      userId: req.user.dataValues.id
    });
    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
