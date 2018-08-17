'use strict';

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
  messages,
  threads
} = require('./data');

const getUniqueIds = (num, max) => {
  return [
    num,
    num > 3 ? num - 3 : num + 5,
    num < max - 3 ? num + 3 : num - 5
  ];
}

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
  const seedOrgs = await Promise.all(organizations.map(async organization => {
    const myOrg = await Organization.create(organization);
    const myCatId = Math.floor(Math.random() * numOfCats) + 1;
    const myCatIds = getUniqueIds(myCatId, numOfCats);
    await myOrg.setCategories(myCatIds);
  }));
  console.log(`seeded ${seedOrgs.length} organizations`);

  //
  // USERS
  // =====
  const numOfTopics = await Topic.count(); // to randomly associate to topics
  const levelsArr = ['Beginner', 'Novice', 'Intermediate', 'Advanced'];
  const seedUsers = await Promise.all(
    users.map(async user => {
      const myUser = await User.create(user);
      const myId = Math.floor(Math.random() * numOfTopics) + 1;
      const myIds = getUniqueIds(myId, numOfTopics);
      await myUser.setTopics(myIds);

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
  // THREADS
  // =======
  const seedThreads = await Promise.all(threads.map(t => Thread.create(t)));
  console.log(`seeded ${seedThreads.length} threads`);

  //
  // MESSAGES
  // ========
  const numOfThreads = await Thread.count(); // to randomly associate to thread
  const seedMsgs = await Promise.all(
    messages.map(async message => {
      const myMessage = await Message.create(message);
      const myThreadId = Math.floor(Math.random() * numOfThreads) + 1;
      const myThread = await Thread.findById(myThreadId);
      await myMessage.setThread(myThread);

      const myUserId = Math.floor(Math.random() * numOfUsers) + 1;
      const mySenderId = myUserId;
      const myReceiverId = myUserId > 3 ? myUserId - 3 : myUserId + 5;

      const mySender = await User.findById(mySenderId);
      const myReceiver = await User.findById(myReceiverId);

      await myMessage.setUser(myUserId);

      // console.log(Object.keys(myThread.__proto__));

      // await myThread.setSender(mySenderId);
      // await myReceiver.setSender(mySenderId);
      // await mySender.setReceiver(myReceiverId);
    })
  );
  console.log(`seeded ${seedMsgs.length} messages`);

  //
  // THREAD

  //
  // THREADS
  // =======
  // const seedThreads = await Promise.all(
  //   threads.map(async thread => {
  //     const myUserId = Math.floor(Math.random() * numOfUsers) + 1;
  //     const mySenderId = myUserId;
  //     const myReceiverId = myUserId > 3 ? myUserId - 3 : myUserId + 5;

  //     const mySender = await User.findById(mySenderId);
  //     const myReceiver = await User.findById(myReceiverId);

  //     await myReceiver.setSender(mySenderId);
  //     await mySender.setReceiver(myReceiverId);
  //   })
  // );

  console.log(`*** seeded successfully ***`);
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
