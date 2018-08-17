const router = require('express').Router();
const { Feedback, Question, User } = require('../db/models');

module.exports = router;

// get all feedback for user
router.get('/', async (req, res, next) => {
  try {
    const feedback = await Feedback.findAll({
      where: { teacherId: req.user.dataValues.id },
      include: [
        {
          model: Question,
          include: {
            model: User,
            attributes: ['firstName', 'lastName', 'id']
          }
        }
      ]
    });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});

router.get('/:feedbackId', async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.feedbackId, {
      include: [
        {
          model: Question,
          include: {
            model: User,
            attributes: ['firstName', 'lastName', 'id']
          }
        }
      ]
    });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});
