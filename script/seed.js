'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

const getRandomIdFrom = num => Math.floor(Math.random() * num) + 1;

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
      const myCatId = getRandomIdFrom(numOfCats);
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
      const myId = getRandomIdFrom(numOfTopics);
      const myIds = getUniqueIds(myId, numOfTopics);
      await myUser.setTopics(myIds);

      const myOrgId = getRandomIdFrom(numOfOrgs);
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
      const myCatId = getRandomIdFrom(numOfCats);
      const myUserId = getRandomIdFrom(numOfUsers);

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
    const myQId = getRandomIdFrom(numOfQs);
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

  // //
  // // THREADS
  // // =======
  // const seedThreads = await Promise.all(threads.map(t => Thread.create(t)));
  // console.log(`seeded ${seedThreads.length} threads`);

  // //
  // // MESSAGES
  // // ========
  // const uniqueThreadMap = new Map();

  // // helper function to repeat this operation
  // const getSenderAndReceiverIds = () => {
  //   const myId = getRandomIdFrom(numOfUsers);
  //   const myIds = getUniqueIds(myId, numOfUsers);
  //   return [myIds[1], myIds[2]];
  // };

  // // helper function to check equality
  // const senderReceiverPairAlreadyExists = (myArr, map) => {
  //   for (let item of map.values()) {
  //     const x = item.sort().toString();
  //     const y = myArr.sort().toString();
  //     console.log('x is ----->  ', x);
  //     console.log('y is ----->  ', y);
  //     if (x === y) return true;
  //   }
  //   return false;
  // }

  // const numOfThreads = await Thread.count(); // to randomly associate to thread
  // const seedMsgs = await Promise.all(messages.map(async (message, i) => {
  //   const myMessage = await Message.create(message);

  //   const [mySenderId, myReceiverId] = await getSenderAndReceiverIds();

  //   const mySender = await User.findById(mySenderId);
  //   const myReceiver = await User.findById(myReceiverId);
  //   await myMessage.setUser(mySender);

  //   const pairExists = await senderReceiverPairAlreadyExists(
  //     [mySenderId, myReceiverId], uniqueThreadMap
  //   );
  //   await console.log('>>>>>> output of pairExists is.....', pairExists);

  //   let myThread;

  //   if (pairExists) {
  //     myThread = await Thread.findAll({
  //       where: {
  //         receiverId: { [Op.or]: [mySenderId, myReceiverId] },
  //         senderId: { [Op.or]: [mySenderId, myReceiverId] }
  //       }
  //     });
  //     // console.log('************', Object.keys(myThread.__proto__));
  //   } else {
  //     const [emptyThread] = await Thread.findAll({
  //       where: { [Op.or]: [{ receiverId: null }, { senderId: null }] },
  //       order: [[Sequelize.literal('random()')]],
  //       limit: 1
  //     });

  //     myThread = await emptyThread;

  //     await myThread.setSender(mySender);
  //     await myThread.setReceiver(myReceiver);

  //     await uniqueThreadMap.set(i, [mySenderId, myReceiverId]);
  //   }

  //   await myMessage.setThread(myThread);

  //   await console.log('*&$%$&*^$#$%&*', uniqueThreadMap);
  // }));

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
