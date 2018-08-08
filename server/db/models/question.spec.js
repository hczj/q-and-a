/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Question = db.model('question');

describe('Question model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
});
