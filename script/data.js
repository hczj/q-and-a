let loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const organizations = [
  {
    name: `Fullstack Academy`,
    location: `Chicago, Illinois`,
    email: `fullstack@example.com`
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
    title: `How do I return the response from an asynchronous call?`,
    description: `So I want to replace field city with my custom model, but I get this error. I think maybe some domain trying to use old 'city' field, but I can't find it.`
  },
  {
    title: `Does Python have a ternary conditional operator?`,
    description: `If Python does not have a ternary conditional operator, is it possible to simulate one using other language constructs?`
  },
  {
    title: `Keystroke display while in VS Code?`,
    description: `I'm trying to find a keystroke software that will display the keystrokes being used while I'm in VS Code. This would be for presenting or doing screencast.`
  },
  {
    title: `Angular-cli installation with npm, keep getting an error?`,
    description: `When I am installing angular-cli using npm, typing the following npm install -g @angular/cli throws an error.`
  },
  {
    title: `Github Commit Push raises 403 Error due to nonlocality?`,
    description:
      "I am trying to push a commit to my repository. But I am getting a curious 403 error message from github that I can't find any documentation for on the internet."
  },
  {
    title: `Xcode project crashing every time it is opened?`,
    description: `I can't know for sure what caused it, but it happened when I was adding Binaries and Libraries I created (I am new to it, so may have done something wrong). You can also see a few lines in the log screenshot about Frameworks, so this might have been the cause.`
  },
  {
    title: `What is the most efficient way to deep clone an object in JavaScript?`,
    description: `What is the most efficient way to clone a JavaScript object? I've seen obj = eval(uneval(o)); being used, but that's non-standard and only supported by Firefox. I've done things like obj = JSON.parse(JSON.stringify(o)); but question the efficiency. I've also seen recursive copying functions with various flaws. I'm surprised no canonical solution exists.`
  },
  {
    title: `What is a plain English explanation of “Big O” notation?`,
    description: `I'd prefer as little formal definition as possible and simple mathematics.`
  },
  {
    title: `Is Java “pass-by-reference” or “pass-by-value”?`,
    description: `I always thought Java was pass-by-reference. However, I've seen a couple of blog posts that claim that it isn't. I don't think I understand the distinction they're making. What is the explanation?`
  },
  {
    title: `Which equals operator (== vs ===) should be used in JavaScript comparisons?`,
    description: `I'm using JSLint to go through JavaScript, and it's returning many suggestions to replace == (two equals signs) with === (three equals signs) when doing things like comparing idSele_UNVEHtype.value.length == 0 inside of an if statement. Is there a performance benefit to replacing == with ===?`
  },
  {
    title: `Can comments be used in JSON?`,
    description: `Can I use comments inside a JSON file? If so, how?`
  },
  {
    title: `How do I remove a particular element from an array in JavaScript?`,
    description: `I have an array of integers, and I'm using the .push() method to add elements to it. Is there a simple way to remove a specific element from an array? The equivalent of something like array.remove(int). I have to use core JavaScript - no frameworks are allowed.`
  },
  {
    title: `What does “use strict” do in JavaScript, and what is the reasoning behind it?`,
    description: `Recently, I ran some of my JavaScript code through Crockford's JSLint, and it gave the following error: Problem at line 1 character 1: Missing "use strict" statement.`
  },
  {
    title: `What and where are the stack and heap?`,
    description: `Programming language books explain that value types are created on the stack, and reference types are created on the heap, without explaining what these two things are. I haven't read a clear explanation of this. `
  },
  {
    title: `How to check whether a string contains a substring in JavaScript?`,
    description: `Usually I would expect a String.contains() method, but there doesn't seem to be one. What is a reasonable way to check for this?`
  },
  {
    title: `How do JavaScript closures work?`,
    description: `How would you explain JavaScript closures to someone with a knowledge of the concepts they consist of (for example functions, variables and the like), but does not understand closures themselves?`
  },
  {
    title: `How do I redirect to another webpage?`,
    description: `How can I redirect the user from one page to another using jQuery or pure JavaScript?`
  },
  {
    title: `What does the “yield” keyword do?`,
    description: `What is the use of the yield keyword in Python? What does it do?`
  },
  {
    title: `What is the correct JSON content type?`,
    description:
      'I have been messing around with JSON for some time, just pushing it out as text and it hasn not hurt anybody (that I know of), but I would like to start doing things properly. I have seen so many purported standards for the JSON content type, but which is correct, or best? I gather that there are security and browser support issues varying between them.'
  },
  {
    title: `How to undo the most recent commits in Git?`,
    description: `I accidentally committed wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?`
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
    content: `Really helpful!!`
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
  { name: `Math`, imageUrl: '../public/Logos/cooking.png' },
  { name: `Graphic Design`, imageUrl: '../public/Logos/graphic_design.png' },
  // { name: `Cooking`, imageUrl: '../public/Logos/cooking.png' },
  // { name: `Science`, imageUrl: '../public/Logos/cooking.png' },
  // { name: `Music`, imageUrl: '../public/Logos/music.png' },
  // { name: `Business`, imageUrl: '../public/Logos/business.png' },
  // { name: `Beauty & Makeup`, imageUrl: '../public/Logos/beauty.png' },
  // { name: `Photography`, imageUrl: '../public/Logos/photography.png' },
  // { name: `Arts & Crafts`, imageUrl: '../public/Logos/cooking.png' }
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
    name: `Redux`,
    category: `Coding`
  },
  {
    name: `MySQL`,
    category: `Coding`
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
