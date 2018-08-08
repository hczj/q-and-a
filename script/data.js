const users = [
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
    firstName: 'Jane',
    lastName: 'Jones',
    email: 'jane@example.com',
    password: 'test',
    isAdmin: true
  }
];

const questions = [
  {
    title: 'Why does the thing do the stuff?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    userId: 2
  },
  {
    title: 'How do I accomplish this other thing???',
    userId: 1
  },
  {
    title: 'Can you help me learn how to weave baskets?',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    userId: 3
  },
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
