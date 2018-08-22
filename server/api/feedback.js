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

// get a specific feedback
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

router.post('/', async (req, res, next) => {
  try {
    const feedback = await Feedback.create({
      rating: req.body.rating,
      content: req.body.content
    });
    await feedback.setQuestion(req.body.questionId);
    await feedback.setStudent(req.body.studentId);
    await feedback.setTeacher(req.body.teacherId);
    res.status(201).json(feedback);
  } catch (err) {
    next(err);
  }
})
