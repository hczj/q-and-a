'use strict';

const db = require('../server/db');
const {
  User,
  Category,
  Topic,
  UserTopic,
  Question,
  Answer
} = require('../server/db/models');

const { users, categories, topics, questions } = require('./data');

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
  // USERS
  // =====
  const numOfTopics = await Topic.count(); // to randomly associate to topics
  const levelsArr = ['Beginner', 'Novice', 'Intermediate', 'Advanced'];
  const seedUsers = await Promise.all(
    users.map(async user => {
      const myUser = await User.create(user);
      const myId = Math.floor(Math.random() * numOfTopics) + 1;
      const myIds = [
        myId,
        myId > 2 ? myId - 2 : myId + 3,
        myId < numOfTopics - 2 ? myId + 2 : myId - 3
      ];

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
  const numOfCats = await Category.count(); // to randomly associate to cats
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
