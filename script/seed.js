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

const { users, categories, topics, questions } = require('./data')

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  //
  // USERS
  // =====
  const seedUsers = await Promise.all(users.map(u => User.create(u)));
  console.log(`seeded ${seedUsers.length} users`);

  //
  // CATEGORIES
  // ==========
  const seedCats = await Promise.all(categories.map(c => Category.create(c)));
  console.log(`seeded ${seedCats.length} categories`);

  //
  // TOPICS
  // ======
  const seedTopics = await Promise.all(topics.map(async topic => {
    const myTopic = await Topic.create(topic);

    if (topic.category) {
      const myCat = await Category.findOne({
        where: { name: topic.category }
      })
      await myCat.setTopics(myTopic);
    }
  }));
  console.log(`seeded ${seedTopics.length} topics`);

  //
  // QUESTIONS
  // =========
  const numOfCats = await Category.count(); // to randomly assign cats to Qs
  const seedQs = await Promise.all(questions.map(async question => {
    const myQuestion = await Question.create(question);
    await myQuestion.setCategory(Math.floor(Math.random() * numOfCats) + 1);
  }));
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
