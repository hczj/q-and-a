const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/questions', require('./questions'));
router.use('/categories', require('./categories'));
router.use('/threads', require('./threads'));
router.use('/messages', require('./messages'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
