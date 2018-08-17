let loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const organizations = [
  {
    name: `Fullstack Academy`,
    location: `Chicago, Illinois`,
    email: `fullstack@example.com`
  },
  {
    name: `Eastern High School`,
    location: `Denver, CO`,
    email: `eastern@example.edu`
  },
  {
    name: `Rising Stars`,
    location: `NYC`,
    email: `stars@example.com`
  }
];

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
    imageUrl: 'https://randomuser.me/api/portraits/men/29.jpg'
  },
  {
    firstName: 'Ahmet',
    lastName: 'Abed',
    location: 'Outer Space',
    bio: loremIpsum,
    email: 'ahmet@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg'
  },
  {
    firstName: 'Jill',
    lastName: 'Jones',
    location: 'San Diego, CA',
    bio: loremIpsum,
    email: 'jill@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/27.jpg'
  },
  {
    firstName: 'Jake',
    lastName: 'Jones',
    location: 'Paris, France',
    bio: loremIpsum,
    email: 'jake@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/26.jpg'
  },
  {
    firstName: 'Laura',
    lastName: 'Lopez',
    location: 'San Jose, CA',
    bio: loremIpsum,
    email: 'laura@example.com',
    password: 'test',
    isAdmin: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/53.jpg'
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
    imageUrl: 'https://randomuser.me/api/portraits/men/71.jpg'
  },
  {
    firstName: 'Sayaka',
    lastName: 'Shiroma',
    location: 'Tokyo',
    bio: loremIpsum,
    email: 'sayaka@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/14.jpg'
  },
  {
    firstName: 'Farrokh',
    lastName: 'Bulsara',
    location: 'Baghdad',
    bio: loremIpsum,
    email: 'farrokh@example.com',
    password: 'test',
    isAdmin: true,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg'
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
    title: `Why doesn't this work?`,
    description: `Ut enim adipisicing elit, sed do eiusmod dolore ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip`
  },
  {
    title: `Do you know how this can be fixed?`,
    description: loremIpsum
  },
  {
    title: `Will you please take a look at this this I'm doing?`,
    description: `Nisi ut aliquip consequat tempor incididunt dolor sit amet, consectetur adipisicing elit, sed do...`
  },
  {
    title: `I need someone to look at this thing I'm doing. Please!`,
    description: `Laboris nisi ut aliquip ex ea commodo consequat tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    title: `Does anyone know how to get this to happen?`,
    description: `Ut aliquip commodo consequat incididunt ut labore aliqua.`
  },
  {
    title: `Has anyone solved this problem before? I'm having a hard time figuring this out`,
    description: loremIpsum
  },
  {
    title: `How can I get this to start working??`,
    description: `Lorem ipsum adipisicing elit, sed do eiusmod dolore magna aliqua.`
  }
];

const categories = [
  { name: `Coding` },
  { name: `Cooking` },
  { name: `Science` },
  { name: `Music` },
  { name: `Business` },
  { name: `Beauty & Makeup` },
  { name: `Photography` },
  { name: `Math` },
  { name: `Graphic Design` },
  { name: `Arts & Crafts` }
];

const threads = [
  {
    receiverId: 1,
    senderId: 2
  },
  {
    receiverId: 1,
    senderId: 3
  },
  {
    receiverId: 3,
    senderId: 2
  },
  {
    receiverId: 2,
    senderId: 3
  },
  {
    receiverId: 4,
    senderId: 2
  },
  {
    receiverId: 1,
    senderId: 4
  },
  {
    receiverId: 3,
    senderId: 4
  },
  {
    receiverId: 1,
    senderId: 5
  },
  {
    receiverId: 5,
    senderId: 3
  },
  {
    receiverId: 5,
    senderId: 2
  },
  {
    receiverId: 2,
    senderId: 6
  },
  {
    receiverId: 4,
    senderId: 6
  },
  {
    receiverId: 1,
    senderId: 6
  },
  {
    receiverId: 3,
    senderId: 7
  },
  {
    receiverId: 7,
    senderId: 5
  },
  {
    receiverId: 1,
    senderId: 8
  },
  {
    receiverId: 5,
    senderId: 8
  },
  {
    receiverId: 8,
    senderId: 2
  },
  {
    receiverId: 9,
    senderId: 6
  },
  {
    receiverId: 4,
    senderId: 9
  },
  {
    receiverId: 1,
    senderId: 9
  },
  {
    receiverId: 9,
    senderId: 7
  },
  {
    receiverId: 10,
    senderId: 5
  },
  {
    receiverId: 10,
    senderId: 8
  },
  {
    receiverId: 10,
    senderId: 2
  },
  {
    receiverId: 10,
    senderId: 6
  },
  {
    receiverId: 11,
    senderId: 9
  },
  {
    receiverId: 11,
    senderId: 2
  },
  {
    receiverId: 11,
    senderId: 7
  },
  {
    receiverId: 11,
    senderId: 5
  },
  {
    receiverId: 12,
    senderId: 9
  },
  {
    receiverId: 12,
    senderId: 3
  },
  {
    receiverId: 12,
    senderId: 7
  },
  {
    receiverId: 12,
    senderId: 5
  }
];

const topics = [
  {
    name: `Python`,
    category: `Coding`
  },
  {
    name: `JavaScript`,
    category: `Coding`
  },
  {
    name: `React.js`,
    category: `Coding`
  },
  {
    name: `Sequelize`,
    category: `Coding`
  },
  {
    name: `Pasta`,
    category: `Cooking`
  },
  {
    name: `Basket Weaving`,
    category: `Arts & Crafts`
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
  },
  {
    name: `Photoshop`,
    category: `Photography`
  },
  {
    name: `Portraits`,
    category: `Photography`
  },
  {
    name: `Algebra`,
    category: `Math`
  },
  {
    name: `Calculus`,
    category: `Math`
  },
  {
    name: `Statistics`,
    category: `Math`
  },
  {
    name: `Chemistry`,
    category: `Science`
  },
  {
    name: `Physics`,
    category: `Science`
  },
  {
    name: `Drawing`,
    category: `Graphic Design`
  },
  {
    name: `Cartoons`,
    category: `Graphic Design`
  },
  {
    name: `Logo Design`,
    category: `Graphic Design`
  }
];

const messages = [
  { content: `Hello there!!` },
  { content: `Hi!!` },
  { content: `are you going to the party?` },
  { content: `How are you doing today?` },
  { content: `Im well, how are you?` },
  { content: `idk i think he's weird but then again maybe not` },
  { content: `Hello you!` },
  { content: `do you want to hang out?` },
  { content: `😱` },
  { content: `Hola!!` },
  { content: `wtf???????????` },
  { content: `Don't you love this cool new site?` },
  { content: `Como estas?` },
  { content: `Muy bien, y tu?!` },
  { content: `well...???` },
  { content: `Asi asi` },
  { content: `aight.` },
  { content: loremIpsum },
  { content: `Have a good night!` },
  { content: `that's cute` },
  { content: `yooo` },
  { content: `man I'll never understand that` },
  { content: `u up?` },
  { content: `Hey are you still around?` },
  { content: `On my way!` },
  { content: `😍😍😍` },
  { content: `I don't think I can make it today` },
  { content: `hey...` },
  { content: `OMG!` },
  { content: `would you please let me know asap?` },
  { content: `It's been such a long time!` },
  { content: `Ok I'll see you there!` },
  { content: `I love you too!!!!` },
  { content: `We should hang out` },
  { content: `That's good to hear.` }
];

module.exports = {
  organizations,
  users,
  questions,
  categories,
  topics,
  threads,
  messages
};
