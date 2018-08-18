'use strict';
const Sequelize = require('sequelize');
const db = require('../server/db');
const {
  Organization,
  User,
  Category,
  Topic,
  UserTopic,
  Question,
  Feedback,
  Message,
  Thread
} = require('../server/db/models');

const {
  organizations,
  users,
  categories,
  topics,
  questions,
  feedbacks,
  messages,
  threads
} = require('./data');

const getUniqueIds = (num, max) => {
  return [num, num > 3 ? num - 3 : num + 5, num < max - 3 ? num + 3 : num - 5];
};

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  //
  // CATEGORIES
  // ==========
  const seedCats = await Promise.all(categories.map(c => Category.create(c)));
  console.log(`seeded ${seedCats.length} categories`);

  //
  // TOPICS
  // ======
  const seedTopics = await Promise.all(
    topics.map(async topic => {
      const myTopic = await Topic.create(topic);

      if (topic.category) {
        const myCat = await Category.findOne({
          where: { name: topic.category }
        });
        await myCat.setTopics(myTopic);
      }
    })
  );
  console.log(`seeded ${seedTopics.length} topics`);

  //
  // ORGANIZATIONS
  // =============
  const numOfCats = await Category.count(); // to randomly associate to cats
  const seedOrgs = await Promise.all(
    organizations.map(async organization => {
      const myOrg = await Organization.create(organization);
      const myCatId = Math.floor(Math.random() * numOfCats) + 1;
      const myCatIds = getUniqueIds(myCatId, numOfCats);
      await myOrg.setCategories(myCatIds);
    })
  );
  console.log(`seeded ${seedOrgs.length} organizations`);

  //
  // USERS
  // =====
  const numOfOrgs = await Organization.count(); // to randomly associate to org
  const numOfTopics = await Topic.count(); // to randomly associate to topics
  const levelsArr = ['Beginner', 'Novice', 'Intermediate', 'Advanced'];
  const seedUsers = await Promise.all(
    users.map(async user => {
      const myUser = await User.create(user);
      const myId = Math.floor(Math.random() * numOfTopics) + 1;
      const myIds = getUniqueIds(myId, numOfTopics);
      await myUser.setTopics(myIds);

      const myOrgId = Math.floor(Math.random() * numOfOrgs) + 1;
      await myUser.setOrganization(myOrgId);

      const myUserTopics = await UserTopic.findAll({
        where: { userId: myUser.id }
      });

      myUserTopics.map(async userTopic => {
        await userTopic.update({
          proficiency: levelsArr[Math.floor(Math.random() * levelsArr.length)]
        });
      });
    })
  );
  console.log(`seeded ${seedUsers.length} users`);

  //
  // QUESTIONS
  // =========
  const numOfUsers = await User.count(); // to randomly associate to users
  const seedQs = await Promise.all(
    questions.map(async question => {
      const myQuestion = await Question.create(question);
      const myCatId = Math.floor(Math.random() * numOfCats) + 1;
      const myUserId = Math.floor(Math.random() * numOfUsers) + 1;

      await myQuestion.setCategory(myCatId);
      await myQuestion.setUser(myUserId);

      const myTopics = await Topic.findAll({
        where: { categoryId: myCatId },
        attributes: ['id']
      });

      const index = Math.floor(Math.random() * myTopics.length);
      await myQuestion.setTopics(myTopics[index]);
    })
  );
  console.log(`seeded ${seedQs.length} questions`);

  //
  // FEEDBACK
  // ========
  const numOfQs = await Question.count(); // to randomly associate to questions
  const seedFeedback = await Promise.all(feedbacks.map(async feedback => {
    const myFeedback = await Feedback.create(feedback);
    const myQId = Math.floor(Math.random() * numOfQs) + 1;
    await Question.update(
      { isActive: false },
      { where: { id: myQId } }
    );
    await myFeedback.setQuestion(myQId);

    const [myTeacher] = await User.findAll({
      where: { isTeacher: true },
      attributes: ['id'],
      order: [[Sequelize.literal('random()')]],
      limit: 1
    });
    await myFeedback.setTeacher(myTeacher.dataValues.id);

    const [myStudent] = await User.findAll({
      where: { isTeacher: false },
      attributes: ['id'],
      order: [[Sequelize.literal('random()')]],
      limit: 1
    });
    await myFeedback.setStudent(myStudent.dataValues.id);
  }));
  console.log(`seeded ${seedFeedback.length} feedbacks`);

  //
  // THREADS
  // =======
  await Thread.bulkCreate(threads);
  const seedMsgs = async () => {
    const numOfThreads = await Thread.count();
    await Promise.all(
      messages.map(async message => {
        const myMessage = await Message.create(message);
        const myThreadId = Math.floor(Math.random() * numOfThreads) + 1;
        const myThread = await Thread.findById(myThreadId);
        await myMessage.setThread(myThread);
      })
    );
  };
  await seedMsgs();
  await seedMsgs();
  await seedMsgs();
  await seedMsgs();

  const allMsgs = await Message.findAll({ attributes: ['id', 'threadId'] });

  const threadIds = [];
  const senderIds = [];
  const receiverIds = [];

  for (let x = 0; x < allMsgs.length; x++) {
    threadIds.push(allMsgs[x].dataValues.threadId);
    const thread = await Thread.findById(threadIds[x], {
      attributes: ['senderId', 'receiverId']
    });
    senderIds.push(thread.dataValues.senderId);
    receiverIds.push(thread.dataValues.receiverId);
  }

  for (let x = 0; x < allMsgs.length; x++) {
    if (x % 2 === 0) {
      await allMsgs[x].setUser(senderIds[x]);
    } else {
      await allMsgs[x].setUser(receiverIds[x]);
    }
  }

  console.log(`seeded ${allMsgs.length} messages`);

  console.log(`***  seeded successfully  ***`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
