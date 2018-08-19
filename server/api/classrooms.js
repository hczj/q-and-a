const router = require('express').Router();
const { Classroom } = require('../db/models');
const Op = require('sequelize').Op;
const { isAdmin, isTeacher } = require('../utils');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const myId = req.user.dataValues.id;
    const classroom = await Classroom.findAll({
      where: { [Op.or]: [{ studentId: myId }, { teacherId: myId }] }
    });
    res.json(classroom);
  } catch (err) {
    next(err);
  }
});

router.post('/', isTeacher, async (req, res, next) => {
  try {
    const classroom = await Classroom.create({ room: req.body.room });
    classroom.setQuestion(req.body.questionId);
    classroom.setStudent(req.body.studentId);
    classroom.setTeacher(req.body.teacherId);
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
