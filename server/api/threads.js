const router = require('express').Router();
const { Message, Thread, User } = require('../db/models');
const Op = require('sequelize').Op;

router.get('/', async (req, res, next) => {
  try {
    const myId = req.user.dataValues.id;

    const threads = await Thread.findAll({
      where: { [Op.or]: [{ receiverId: myId }, { senderId: myId }] },
      include: {
        model: Message
      },
      order: [[Message, 'id', 'ASC']]
    });

    const userIds = threads.map(
      thread =>
        thread.receiverId === myId ? thread.senderId : thread.receiverId
    );

    const otherUser = [];

    for (let i in userIds) {
      let user = await User.findById(userIds[i]);
      otherUser.push(user);
    }

    await User.findAll({
      where: { id: userIds },
      attributes: ['firstName', 'lastName']
    });

    const output = [];
    for (let x = 0; x < threads.length; x++) {
      output.push({ thread: threads[x], user: otherUser[x] });
    }

    res.json(output);
  } catch (err) {
    next(err);
  }
});

router.get('/:threadId', async (req, res, next) => {
  try {
    const myId = req.user.dataValues.id;

    const thread = await Thread.findById(req.params.threadId, {
      include: {
        model: Message
      },
      order: [[Message, 'id', 'ASC']]
    });

    const userId =
      thread.receiverId === myId ? thread.senderId : thread.receiverId;

    const otherUser = await User.findOne({
      where: { id: userId },
      attributes: ['firstName', 'lastName']
    });

    res.json({ thread: thread, user: otherUser });
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
