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
          attributes: ['id', 'content', 'createdAt', 'userId'],
          include: [{
            model: User,
            attributes: ['firstName', 'lastName']
          }],
          // limit: 1
        }
      ],
      order: [[Message, 'id', 'DESC']],
      attributes: ['id', 'senderId', 'receiverId']
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
          attributes: ['id', 'content', 'createdAt', 'userId'],
          include: [{
            model: User,
            attributes: ['firstName', 'lastName']
          }]
        }
      ],
      order: [[Message, 'id', 'ASC']],
      attributes: ['id', 'senderId', 'receiverId']
    });

    res.json(thread);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { content, senderId, receiverId } = req.body;
    let threadId = req.body.threadId;

    if (!threadId) {
      const [thread] = await Thread.findOrCreate({
        where: {
          [Op.and]: [
            { senderId: { [Op.or]: [senderId, receiverId] } },
            { receiverId: { [Op.or]: [senderId, receiverId] } }
          ]
        }
      });

      thread.setSender(senderId);
      thread.setReceiver(receiverId);

      threadId = thread.dataValues.id;
    }

    const message = await Message.create({ content });

    message.setThread(threadId);
    message.setUser(req.user.dataValues.id);

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
