const { expect } = require('chai');
const db = require('../index');
const Topic = db.model('topic');
const Sequelize = require('sequelize')

// describe('Topic model', () => {
//     beforeEach(() => {
//       return db.sync({ force: true });
//     })

//     it('has a not null title', () => {
//         expect(Topic.create({title: ""})).to.be.equal(Sequelize.ValidationError())
//     })
// })