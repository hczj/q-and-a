const User = require('./user');
const Category = require('./category');
const Topic = require('./topic');
const UserTopic = require('./user-topic');
const Question = require('./question');
const Answer = require('./answer');
const Thread = require('./thread');
const Message = require('./message');

Question.belongsTo(User);
User.hasMany(Question);
Question.belongsTo(Category);

Answer.belongsTo(User, { as: 'learner' });
Answer.belongsTo(User, { as: 'teacher' });

User.belongsToMany(Topic, { through: UserTopic });
Topic.belongsToMany(User, { through: UserTopic });

Message.belongsTo(Thread);
Thread.hasMany(Message);

User.belongsToMany(User, {
  as: 'sender',
  through: {
    model: Thread,
    unique: false
  },
  foreignKey: 'senderId'
});

User.belongsToMany(User, {
  as: 'receiver',
  through: {
    model: Thread,
    unique: false
  },
  foreignKey: 'receiverId'
});

Message.belongsTo(User);
User.hasMany(Message);

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
  Thread,
  Message
};
