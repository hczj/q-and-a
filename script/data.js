let loremIpsum =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const users = [
  {
    firstName: 'Hollie',
    lastName: 'Lambert',
    location: 'Chicago',
    description: loremIpsum,
    email: 'hollie@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Zohaib',
    lastName: 'Farooqi',
    location: 'Chicago',
    description: loremIpsum,
    email: 'zohaib@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Jerry',
    lastName: 'Wu',
    location: 'Chicago',
    description: loremIpsum,
    email: 'jerry@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Chris',
    lastName: 'Lusk',
    location: 'Chicago',
    description: loremIpsum,
    email: 'chris@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Azar',
    lastName: 'Abed',
    location: 'Memphis',
    description: loremIpsum,
    email: 'azar@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Ahmet',
    lastName: 'Abed',
    location: 'Outer Space',
    description: loremIpsum,
    email: 'ahmet@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Jill',
    lastName: 'Jones',
    location: 'San Diego, CA',
    description: loremIpsum,
    email: 'jill@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Jake',
    lastName: 'Jones',
    location: 'Paris, France',
    description: loremIpsum,
    email: 'jake@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Laura',
    lastName: 'Lopez',
    location: 'San Jose, CA',
    description: loremIpsum,
    email: 'laura@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Luis',
    lastName: 'Lopez',
    location: 'Mexico City',
    description: loremIpsum,
    email: 'luis@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Sayaka',
    lastName: 'Shiroma',
    location: 'Tokyo',
    description: loremIpsum,
    email: 'sayaka@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Shu',
    lastName: 'Shiroma',
    location: 'Tokyo',
    description: loremIpsum,
    email: 'shu@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Farrokh',
    lastName: 'Bulsara',
    location: 'Baghdad',
    description: loremIpsum,
    email: 'farrokh@example.com',
    password: 'test',
    isAdmin: true
  }
];

const questions = [
  {
    title: `Why does the thing do the stuff?`,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  },
  {
    title: `How do I accomplish this other thing???`
  },
  {
    title: `Can you help me learn how to do this?`,
    description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  },
  {
    title: `Would you help me try to learn this?`,
    description: `Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    title: `HELP! I can't figure out why this that or the other.`,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!!!!!!!`
  },
  {
    title: `What would I need to do here?`,
    description: loremIpsum
  },
  {
    title: `SOMEONE PLEASE HELP ME`,
    description: `I am so lost`
  },
  {
    title: `Would you do this or that to solve this problem?`,
    description: loremIpsum
  },
  {
    title: `Do you know how this can be fixed?`,
    description: loremIpsum
  },
  {
    title: `Will you please take a look at this this I'm doing?`,
    description: `Laboris nisi ut aliquip ex ea commodo consequat tempor incididunt dolor sit amet, consectetur adipisicing elit, sed do...`
  }
];

const categories = [
  { name: `Code` },
  { name: `Cooking` },
  { name: `Basket Weaving` },
  { name: `Music` },
  { name: `Business` },
  { name: `Beauty & Makeup`}
];

const topics = [
  {
    name: `Python`,
    category: `Code`
  },
  {
    name: `JavaScript`,
    category: `Code`
  },
  {
    name: `React.js`,
    category: `Code`
  },
  {
    name: `Sequelize`,
    category: `Code`
  },
  {
    name: `Pasta`,
    category: `Cooking`
  },
  {
    name: `Wicker`,
    category: `Basket Weaving`
  },
  {
    name: `Guitar`,
    category: `Music`
  },
  {
    name: `Piano`,
    category: `Music`
  },
  {
    name: `Finance`,
    category: `Business`
  },
  {
    name: `Management`,
    category: `Business`
  },
  {
    name: `Skincare`,
    category: `Beauty & Makeup`
  },
  {
    name: `Hair`,
    category: `Beauty & Makeup`
  }
];

module.exports = {
  users,
  questions,
  categories,
  topics
};
