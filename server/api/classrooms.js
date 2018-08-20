const router = require('express').Router();
const { Classroom, Question, User } = require('../db/models');
const Op = require('sequelize').Op;
const { isAdmin, isTeacher } = require('../utils');
module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const classroom = await Classroom.findAll();
    res.json(classroom);
  } catch (err) {
    next(err);
  }
});

router.get('/:classroom', async (req, res, next) => {
  try {
    const classroom = await Classroom.findById(req.params.classroom, {
      include: [
        {
          model: Question,
          attributes: ['id', 'title']
        },
        {
          model: User,
          as: 'student',
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        },
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        }
      ]
    });
    res.json(classroom);
  } catch (err) {
    next(err);
  }
});

router.post('/', isTeacher, async (req, res, next) => {
  try {
    const classroom = await Classroom.create({ room: req.body.room });
    await classroom.setQuestion(req.body.questionId);
    await classroom.setStudent(req.body.studentId);
    await classroom.setTeacher(req.body.teacherId);
    res.status(201).json(classroom);
  } catch (err) {
    next(err);
  }
});

router.delete('/:classroom', isTeacher, async (req, res, next) => {
  try {
    await Classroom.destroy({ where: { room: req.params.classroom } });
    res.json(req.params.classroom);
  } catch (err) {
    next(err);
  }
});
