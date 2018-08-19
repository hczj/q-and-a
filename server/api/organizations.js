const router = require('express').Router();
const { Organization } = require('../db/models');
module.exports = router;

// get all organizations
router.get('/', async (req, res, next) => {
  try {
    const organizations = await Organization.findAll();
    res.json(organizations);
  } catch (err) {
    next(err);
  }
});
