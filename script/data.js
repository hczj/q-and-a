const users = [
  {
    firstName: 'Hollie',
    lastName: 'Lambert',
    email: 'hollie@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Zohaib',
    lastName: 'Farooqi',
    email: 'zohaib@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Jerry',
    lastName: 'Wu',
    email: 'jerry@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Chris',
    lastName: 'Lusk',
    email: 'chris@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Azar',
    lastName: 'Abed',
    email: 'azar@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Ahmet',
    lastName: 'Abed',
    email: 'ahmet@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Jill',
    lastName: 'Jones',
    email: 'jill@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Jake',
    lastName: 'Jones',
    email: 'jake@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Laura',
    lastName: 'Lopez',
    email: 'laura@example.com',
    password: 'test',
    isAdmin: true
  },
  {
    firstName: 'Luis',
    lastName: 'Lopez',
    email: 'luis@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Sayaka',
    lastName: 'Shiroma',
    email: 'sayaka@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Shu',
    lastName: 'Shiroma',
    email: 'shu@example.com',
    password: 'test',
    isAdmin: false
  },
  {
    firstName: 'Farrokh',
    lastName: 'Bulsara',
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
    description: `Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.`
  },
  {
    title: `HELP! I can't figure out why this that or the other.`,
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!!!!!!!`
  }
];

const categories = [
  { name: 'Code' },
  { name: 'Cooking' },
  { name: 'Basket Weaving' }
];

const topics = [
  {
    name: 'Python',
    category: 'Code'
  },
  {
    name: 'Pasta',
    category: 'Cooking'
  },
  {
    name: 'Wicker',
    category: 'Basket Weaving'
  }
];

module.exports = {
  users,
  questions,
  categories,
  topics
}
