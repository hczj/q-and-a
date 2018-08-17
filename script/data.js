let loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const users = [
  {
    firstName: 'Hollie',
    lastName: 'Lambert',
    location: 'Chicago',
    bio: loremIpsum,
    email: 'hollie@example.com',
    password: 'test',
    isAdmin: true,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    firstName: 'Zohaib',
    lastName: 'Farooqi',
    location: 'Chicago',
    bio: loremIpsum,
    email: 'zohaib@example.com',
    password: 'test',
    isAdmin: true,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    firstName: 'Jerry',
    lastName: 'Wu',
    location: 'Chicago',
    bio: loremIpsum,
    email: 'jerry@example.com',
    password: 'test',
    isAdmin: true,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    firstName: 'Chris',
    lastName: 'Lusk',
    location: 'Chicago',
    bio: loremIpsum,
    email: 'chris@example.com',
    password: 'test',
    isAdmin: true,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    firstName: 'Azar',
    lastName: 'Abed',
    location: 'Memphis',
    bio: loremIpsum,
    email: 'azar@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    firstName: 'Ahmet',
    lastName: 'Abed',
    location: 'Outer Space',
    bio: loremIpsum,
    email: 'ahmet@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    firstName: 'Jill',
    lastName: 'Jones',
    location: 'San Diego, CA',
    bio: loremIpsum,
    email: 'jill@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    firstName: 'Jake',
    lastName: 'Jones',
    location: 'Paris, France',
    bio: loremIpsum,
    email: 'jake@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg'
  },
  {
    firstName: 'Laura',
    lastName: 'Lopez',
    location: 'San Jose, CA',
    bio: loremIpsum,
    email: 'laura@example.com',
    password: 'test',
    isAdmin: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    firstName: 'Luis',
    lastName: 'Lopez',
    location: 'Mexico City',
    bio: loremIpsum,
    email: 'luis@example.com',
    password: 'test',
    isAdmin: false,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg'
  },
  {
    firstName: 'Sayaka',
    lastName: 'Shiroma',
    location: 'Tokyo',
    bio: loremIpsum,
    email: 'sayaka@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    firstName: 'Shu',
    lastName: 'Shiroma',
    location: 'Tokyo',
    bio: loremIpsum,
    email: 'shu@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    firstName: 'Farrokh',
    lastName: 'Bulsara',
    location: 'Baghdad',
    bio: loremIpsum,
    email: 'farrokh@example.com',
    password: 'test',
    isAdmin: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
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
  { name: `Beauty & Makeup` }
];

const messages = [
  {
    content: 'Hello there!!',
    threadId: 1,
    userId: 1
  },
  {
    content: 'Hi!!',
    threadId: 1,
    userId: 2
  },
  {
    content: 'How are you doing today?',
    threadId: 1,
    userId: 1
  },
  {
    content: 'Im well, how are you?',
    threadId: 1,
    userId: 2
  },
  {
    content: 'Very good!',
    threadId: 1,
    userId: 1
  },
  {
    content: 'Hello you!',
    threadId: 2,
    userId: 1
  },
  {
    content: 'Hola!!',
    threadId: 2,
    userId: 3
  },
  {
    content: 'Como estas?',
    threadId: 2,
    userId: 1
  },
  {
    content: 'Muy bien, y tu?!',
    threadId: 2,
    userId: 3
  },
  {
    content: 'Asi asi',
    threadId: 2,
    userId: 1
  },
  {
    content: 'aight.',
    threadId: 2,
    userId: 3
  }
];

const threads = [
  {
    receiverId: 1,
    senderId: 2
  },
  {
    receiverId: 1,
    senderId: 3
  }
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
  topics,
  threads,
  messages
};
