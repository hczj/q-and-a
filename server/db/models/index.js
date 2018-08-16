const User = require('./user');
const Category = require('./category');
const Topic = require('./topic');
const UserTopic = require('./user-topic');
const Question = require('./question');
const Answer = require('./answer');
const Comment = require('./comment');

Question.belongsTo(User);
User.hasMany(Question);
Question.belongsTo(Category);

Comment.belongsTo(User);
Comment.belongsTo(Question);
Question.hasMany(Comment);

Answer.belongsTo(User, { as: 'learner' });
Answer.belongsTo(User, { as: 'teacher' });

User.belongsToMany(Topic, { through: UserTopic });
Topic.belongsToMany(User, { through: UserTopic });

UserTopic.belongsTo(Topic);

Topic.belongsTo(Category);
Category.hasMany(Topic);

Question.belongsToMany(Topic, { through: 'questionTopics' });
Topic.belongsToMany(Question, { through: 'questionTopics' });

module.exports = {
  User,
  Category,
  Topic,
  UserTopic,
  Question,
  Answer,
  Comment
};
