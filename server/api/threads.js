const router = require('express').Router();
const { Message, Thread, User } = require('../db/models');
const Op = require('sequelize').Op;

router.get('/', async (req, res, next) => {
  try {
    const threads = await Thread.findAll({
      include: [Message],
      order: [[Message, 'id', 'ASC']]
    })
    res.json(threads);
  } catch (err) {
    next(err);
  }
});

router.get('/:threadId', async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.params.threadId, {
      include: [Message],
      order: [[Message, 'id', 'ASC']]
    });
    res.json(thread);
  } catch (err) {
    next(err);
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const myId = req.user.dataValues.id;
//     const threads = await Thread.findAll({
//       where: { [Op.or]: [{ receiverId: myId }, { senderId: myId }] },
//       include: [Message],
//       order: [[Message, 'id', 'ASC']]
//     });
//     // console.log('********** threads', threads);
//     const userIds = threads.map(
//       thread =>
//         thread.receiverId === req.user.dataValues.id
//           ? thread.senderId
//           : thread.receiverId
//     );
//     const otherUser = await User.findAll({
//       where: { id: userIds },
//       attributes: ['firstName', 'lastName']
//     });
//     // const output = [];
//     // for (let i = 0; i < threads.length; i++) {
//     //   output.push({ thread: threads[i], user: otherUser[i] });
//     // }

//     // res.json(output);
//     res.json(threads)
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:threadId', async (req, res, next) => {
//   try {
//     const myId = req.user.dataValues.id;

    // const thread = await Thread.findById(req.params.threadId, {
    //   include: [Message],
    //   order: [[Message, 'id', 'ASC']]
    // });

//     const userId =
//       thread.receiverId === myId ? thread.senderId : thread.receiverId;

//     const otherUser = await User.findOne({
//       where: { id: userId },
//       attributes: ['firstName', 'lastName']
//     });

//     res.json({ thread: thread, user: otherUser });
//   } catch (err) {
//     next(err);
//   }
// });

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
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
