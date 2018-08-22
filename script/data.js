let loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const organizations = [
  {
    name: `Fullstack Academy`,
    location: `Chicago, Illinois`,
    email: `fullstack@example.com`
  }
  // {
  //   name: `Eastern High School`,
  //   location: `Denver, CO`,
  //   email: `eastern@example.edu`
  // },
  // {
  //   name: `Rising Stars`,
  //   location: `Brazil`,
  //   email: `stars@example.com`
  // },
  // {
  //   name: `Love2Learn`,
  //   location: `Tokyo`,
  //   email: `love2learn@example.com`
  // },
  // {
  //   name: `Watertown Jr. High`,
  //   location: `Watertown, NE`,
  //   email: `watertown@example.edu`
  // }
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
    imageUrl: 'https://randomuser.me/api/portraits/women/94.jpg'
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
    imageUrl: 'https://randomuser.me/api/portraits/men/95.jpg'
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
    location: 'Australia',
    bio: loremIpsum,
    email: 'ahmet@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/58.jpg'
  },
  {
    firstName: 'Jill',
    lastName: 'Jones',
    location: 'San Diego, CA',
    bio: loremIpsum,
    email: 'jill@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/30.jpg'
  },
  {
    firstName: 'Jake',
    lastName: 'Jones',
    location: 'Paris, France',
    bio: loremIpsum,
    email: 'jake@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg'
  },
  {
    firstName: 'Laura',
    lastName: 'Lopez',
    location: 'San Jose, CA',
    bio: loremIpsum,
    email: 'laura@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/24.jpg'
  },
  {
    firstName: 'Luis',
    lastName: 'Lopez',
    location: 'Mexico City',
    bio: loremIpsum,
    email: 'luis@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/71.jpg'
  },
  {
    firstName: 'Sora',
    lastName: 'Shiroma',
    location: 'Kyoto',
    bio: loremIpsum,
    email: 'sora@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/90.jpg'
  },
  {
    firstName: 'Sayaka',
    lastName: 'Shiroma',
    location: 'Tokyo',
    bio: loremIpsum,
    email: 'sayaka@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/27.jpg'
  },
  {
    firstName: 'Nicki',
    lastName: 'North',
    location: 'Toronto',
    bio: loremIpsum,
    email: 'nicki@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg'
  },
  {
    firstName: 'Nathan',
    lastName: 'North',
    location: 'Montreal',
    bio: loremIpsum,
    email: 'nathan@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/54.jpg'
  },
  {
    firstName: 'Paighten',
    lastName: 'Parker',
    location: 'Austin, TX',
    bio: loremIpsum,
    email: 'paighten@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg'
  },
  {
    firstName: 'Peter',
    lastName: 'Parker',
    location: 'New York City',
    bio: loremIpsum,
    email: 'peter@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/64.jpg'
  },
  {
    firstName: 'Farrokh',
    lastName: 'Bulsara',
    location: 'Baghdad',
    bio: loremIpsum,
    email: 'farrokh@example.com',
    password: 'test',
    isAdmin: false,
    imageUrl: 'https://randomuser.me/api/portraits/men/86.jpg'
  }
];

const questions = [
  {
    title: `Uncaught error when replacing original field?`,
    description: `So I want to replace field city with my custom model, but I get this error. I think maybe some domain trying to use old 'city' field, but I can't find it.`
  },
  {
    title: `Cannot access (or ping) a particular website (buxfer.com) from Amazon Workspace Linux Desktop`
  },
  {
    title: `Keystroke display while in VS Code?`,
    description: `I'm trying to find a keystroke software that will display the keystrokes being used while I'm in VS Code. This would be for presenting or doing screencast.`
  },
  {
    title: `Angular-cli installation with npm, keep getting an error??`,
    description: `When I am installing angular-cli using npm, typing the following npm install -g @angular/cli throws an error.`
  },
  {
    title: `Github Commit Push raises 403 Error due to nonlocality`,
    description:
      "I am trying to push a commit to my repository. But I am getting a curious 403 error message from github that I can't find any documentation for on the internet"
  },
  {
    title: `Xcode project crashing every time it is opened?`,
    description: `I can't know for sure what caused it, but it happened when I was adding Binaries and Libraries I created (I am new to it, so may have done something wrong). You can also see a few lines in the log screenshot about Frameworks, so this might have been the cause.`
  },
  {
    title: `How do I make a C++ object non-copyable?`
  },
  {
    title: `How do I simplify radical math expressions?`
  },
  {
    title: `Find the x and y intercepts, the vertex and the axis of symmetry of the parabola with equation y = - x 2 + 2 x + 3?`,
    description: `I've been trying to figure this out for the past two hours!!!`
  },
  {
    title: `Two cars started from the same point, at 5 am, traveling in opposite directions at 40 and 50 mph respectively. At what time will they be 450 miles apart?`,
    description: "My parents aren't good at math!!"
  },
  {
    title: `Decompose into partial fractions : (5x + 10) / x(x + 5)`
  },
  {
    title: `Has anyone used an abacus before?`
  },
  {
    title: `Can someone explain the origin of south asian tensions??`,
    description: 'Is it mostly religious or what??'
  },
  {
    title: `Will you please take a look at this this I'm doing?`,
    description: `Nisi ut aliquip consequat tempor incididunt dolor sit amet, consectetur adipisicing elit, sed do...`
  },
  {
    title: `Can someone take a look at what I'm working on??`,
    description: loremIpsum
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
    title: `Have you ever worked with this or that before?`,
    description: `Quis exercitation laboris nisi ut aliquip.`
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

const feedbacks = [
  {
    rating: 2,
    content: "I really don't think this instructor explained things well."
  },
  {
    rating: 3
  },
  {
    rating: 5,
    content: `Really helpful!!!!!!!`
  },
  {
    rating: 4,
    content:
      'That was great! I just needed a little bit more guidance on my last issue there.'
  },
  {
    rating: 4
  },
  {
    rating: 3,
    content:
      "It was sort of helpful, I don't feel like everything was clarified..."
  },
  {
    rating: 5
  },
  {
    rating: 1,
    content: `my teacher was rude`
  }
];

const categories = [
  { name: `Coding`, imageUrl: '../public/Logos/coding.png' },
  { name: `Cooking`, imageUrl: '../public/Logos/cooking.png' },
  { name: `Science`, imageUrl: '../public/Logos/cooking.png' },
  { name: `Music`, imageUrl: '../public/Logos/music.png' },
  { name: `Business`, imageUrl: '../public/Logos/business.png' },
  { name: `Beauty & Makeup`, imageUrl: '../public/Logos/beauty.png' },
  { name: `Photography`, imageUrl: '../public/Logos/photography.png' },
  { name: `Math`, imageUrl: '../public/Logos/cooking.png' },
  { name: `Graphic Design`, imageUrl: '../public/Logos/graphic_design.png' },
  { name: `Arts & Crafts`, imageUrl: '../public/Logos/cooking.png' }
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

// const threads = new Array(15).fill({});

const messages = [
  { content: `Hello there!!` },
  { content: `Hi!!` },
  { content: `are you going to the party?` },
  { content: `How are you doing today?` },
  { content: `Im well, how are you?` },
  { content: `Hello you!` },
  { content: `do you want to hang out?` },
  { content: `Hola!!` },
  { content: `Don't you love this cool new site?` },
  { content: `Como estas?` },
  { content: `Muy bien, y tu?!` },
  { content: `well...???` },
  { content: `Asi asi` },
  { content: `aight.` },
  { content: `Have a good night!` },
  { content: `that's cute` },
  { content: `yooo` },
  { content: `man I'll never understand that` },
  { content: `Hey are you still around?` },
  { content: `On my way!` },
  { content: `I don't think I can make it today` },
  { content: `hey!` },
  { content: `would you please let me know asap?` },
  { content: `It's been such a long time!` },
  { content: `Ok I'll see you there!` },
  { content: `That's good to hear.` }
];

module.exports = {
  organizations,
  users,
  questions,
  feedbacks,
  categories,
  topics,
  threads,
  messages
};
