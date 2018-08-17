const Organization = require('./organization');
const User = require('./user');
const Category = require('./category');
const Topic = require('./topic');
const UserTopic = require('./user-topic');
const Question = require('./question');
const Feedback = require('./feedback');
const Thread = require('./thread');
const Message = require('./message');

Organization.hasMany(User);
User.belongsTo(Organization);

Organization.belongsToMany(Category, { through: 'organizationCategory' });
Category.belongsToMany(Organization, { through: 'organizationCategory' });

Question.belongsTo(User);
User.hasMany(Question);
Question.belongsTo(Category);

Feedback.belongsTo(Question);
Feedback.belongsTo(User, { as: 'Student' });
Feedback.belongsTo(User, { as: 'Teacher' });

User.belongsToMany(Topic, { through: UserTopic });
Topic.belongsToMany(User, { through: UserTopic });

Message.belongsTo(Thread);
Thread.hasMany(Message);

User.belongsToMany(User, {
  as: 'Sender',
  through: {
    model: Thread,
    unique: false
  },
  foreignKey: 'senderId'
});

User.belongsToMany(User, {
  as: 'Receiver',
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
  Organization,
  User,
  Category,
  Topic,
  UserTopic,
  Question,
  Feedback,
  Thread,
  Message
};
