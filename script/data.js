const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

// Categories
const PROGRAMMING = 'Programming';
const MATH = 'Math';
const SCIENCE = 'Science';
const DESIGN = 'Design';
const MUSIC = 'Music';

// Topics
const PYTHON = 'Python';
const JAVASCRIPT = 'JavaScript';
const _JSON = 'JSON';
const REACT = 'React.js';
const ANGULAR = 'Angular';
const GIT = 'Git';
const GITHUB = 'GitHub';
const XCODE = 'Xcode';
const NODE = 'Node';
const DATA = 'Data Structures';
const STACK = 'Stack';
const HEAP = 'Heap';

const ALGEBRA = 'Algebra';
const CALCULUS = 'Calculus';
const PROBABILITY = 'Probability';

const BIOLOGY = 'Biology';
const CHEMISTRY = 'Chemistry';

const TYPOGRAPHY = 'Typography';
const ILLUSTRATOR = 'Adobe Illustrator';
const LOGO = 'Logo Design';

const GUITAR = 'Guitar';
const PIANO = 'Piano';
const THEORY = 'Music Theory';
const EQUIPMENT = 'Music Equipment';

/**
 *************************
 *************************

  SEED DATA OBJECTS BELOW

 *************************
 *************************
 */

const categories = [
  { name: PROGRAMMING },
  { name: MATH },
  { name: SCIENCE },
  { name: DESIGN },
  { name: MUSIC }
];

const topics = [
  { name: PYTHON, category: PROGRAMMING },
  { name: JAVASCRIPT, category: PROGRAMMING },
  { name: _JSON, category: PROGRAMMING },
  { name: REACT, category: PROGRAMMING },
  { name: ANGULAR, category: PROGRAMMING },
  { name: GIT, category: PROGRAMMING },
  { name: GITHUB, category: PROGRAMMING },
  { name: XCODE, category: PROGRAMMING },
  { name: NODE, category: PROGRAMMING },
  { name: DATA, category: PROGRAMMING },
  { name: STACK, category: PROGRAMMING },
  { name: HEAP, category: PROGRAMMING },

  { name: ALGEBRA, category: MATH },
  { name: CALCULUS, category: MATH },
  { name: PROBABILITY, category: MATH },

  { name: BIOLOGY, category: SCIENCE },
  { name: CHEMISTRY, category: SCIENCE },

  { name: TYPOGRAPHY, category: DESIGN },
  { name: ILLUSTRATOR, category: DESIGN },
  { name: LOGO, category: DESIGN },

  { name: PIANO, category: MUSIC },
  { name: GUITAR, category: MUSIC },
  { name: THEORY, category: MUSIC },
  { name: EQUIPMENT, category: MUSIC },
];

const organizations = [
  {
    name: `Fullstack Academy`,
    location: `Chicago, Illinois`,
    email: `fullstack@example.com`
  }
];

const users = [
  {
    firstName: 'Teacher',
    lastName: 'Test',
    location: 'Chicago',
    bio: loremIpsum,
    email: 'teacher@example.com',
    password: 'test',
    isAdmin: false,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg'
  },
  {
    firstName: 'Student',
    lastName: 'Test',
    location: 'Chicago',
    bio: loremIpsum,
    email: 'student@example.com',
    password: 'test',
    isAdmin: false,
    isTeacher: true,
    imageUrl: 'https://randomuser.me/api/portraits/women/39.jpg'
  },
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
  /**
   * PROGRAMMING
   */
  {
    title: `Does Python have a ternary conditional operator?`,
    description: `If Python does not have a ternary conditional operator, is it possible to simulate one using other language constructs?`,
    category: PROGRAMMING,
    topics: [PYTHON]
  },
  {
    title: `Angular-cli installation with npm, keep getting an error?`,
    description: `When I am installing angular-cli using npm, typing the following npm install -g @angular/cli throws an error.`,
    category: PROGRAMMING,
    topics: [ANGULAR, NODE]
  },
  {
    title: `Github Commit Push raises 403 Error due to nonlocality?`,
    description:
      "I am trying to push a commit to my repository. But I am getting a curious 403 error message from github that I can't find any documentation for on the internet.",
    category: PROGRAMMING,
    topics: [GIT, GITHUB]
  },
  {
    title: `Xcode project crashing every time it is opened?`,
    description: `I can't know for sure what caused it, but it happened when I was adding Binaries and Libraries I created (I am new to it, so may have done something wrong). You can also see a few lines in the log screenshot about Frameworks, so this might have been the cause.`,
    category: PROGRAMMING,
    topics: [XCODE]
  },
  {
    title: `What is the most efficient way to deep clone an object in JavaScript?`,
    description: `What is the most efficient way to clone a JavaScript object? I've seen obj = eval(uneval(o)); being used, but that's non-standard and only supported by Firefox. I've done things like obj = JSON.parse(JSON.stringify(o)); but question the efficiency. I've also seen recursive copying functions with various flaws. I'm surprised no canonical solution exists.`,
    category: PROGRAMMING,
    topics: [JAVASCRIPT]
  },
  {
    title: `What is a plain English explanation of “Big O” notation?`,
    description: `I'd prefer as little formal definition as possible and simple mathematics.`,
    category: PROGRAMMING,
    topics: [DATA]
  },
  {
    title: `Which equals operator (== vs ===) should be used in JavaScript comparisons?`,
    description: `I'm using JSLint to go through JavaScript, and it's returning many suggestions to replace == (two equals signs) with === (three equals signs) when doing things like comparing idSele_UNVEHtype.value.length == 0 inside of an if statement. Is there a performance benefit to replacing == with ===?`,
    category: PROGRAMMING,
    topics: [JAVASCRIPT]
  },
  {
    title: `Can comments be used in JSON?`,
    description: `Can I use comments inside a JSON file? If so, how?`,
    category: PROGRAMMING,
    topics: [JAVASCRIPT, _JSON]
  },
  {
    title: `How do I remove a particular element from an array in JavaScript?`,
    description: `I have an array of integers, and I'm using the .push() method to add elements to it. Is there a simple way to remove a specific element from an array? The equivalent of something like array.remove(int). I have to use core JavaScript - no frameworks are allowed.`,
    category: PROGRAMMING,
    topics: [JAVASCRIPT]
  },
  {
    title: `What does “use strict” do in JavaScript, and what is the reasoning behind it?`,
    description: `Recently, I ran some of my JavaScript code through Crockford's JSLint, and it gave the following error: Problem at line 1 character 1: Missing "use strict" statement.`,
    category: PROGRAMMING,
    topics: [JAVASCRIPT]
  },
  {
    title: `What and where are the stack and heap?`,
    description: `Programming language books explain that value types are created on the stack, and reference types are created on the heap, without explaining what these two things are. I haven't read a clear explanation of this.`,
    category: PROGRAMMING,
    topics: [DATA]
  },
  {
    title: `How do JavaScript closures work?`,
    description: `How would you explain JavaScript closures to someone with a knowledge of the concepts they consist of (for example functions, variables and the like), but does not understand closures themselves?`,
    category: PROGRAMMING,
    topics: [JAVASCRIPT]
  },
  {
    title: `What does the “yield” keyword do?`,
    description: `What is the use of the yield keyword in Python? What does it do?`,
    category: PROGRAMMING,
    topics: [PYTHON]
  },
  {
    title: `What is the correct JSON content type?`,
    description:
      'I have been messing around with JSON for some time, just pushing it out as text and it hasn not hurt anybody (that I know of), but I would like to start doing things properly. I have seen so many purported standards for the JSON content type, but which is correct, or best? I gather that there are security and browser support issues varying between them.',
    category: PROGRAMMING,
    topics: [_JSON]
  },
  {
    title: `How to undo the most recent commits in Git?`,
    description: `I accidentally committed wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?`,
    category: PROGRAMMING,
    topics: [GIT]
  },

  /**
   * MATH
   */
  {
    title: `Is there a combinatorical proof for this probability?`,
    description: `Is there a more combinatorical proof of the probability above? I used to use probability trees and the falling factorial to calculate P(A) when I was a kid until a math professor I met by chance pointed out that the combinatorical way of calculating P(A) like above is much faster. Now with the constraint of the special card suddenly I'm introducing conditional probability again in P(Ak) and an implicit probability tree, so I want to know if I can get rid of this again?`,
    category: MATH,
    topics: [PROBABILITY]
  },
  {
    title: `how to change a cone's base area and height?`,
    description: `How to make some cones with different heights and same mass and base area and also with different base area and same height and mass?`,
    category: MATH,
    topics: [ALGEBRA]
  },
  {
    title: `Linearity of a function when its codomain has dimension K > 1`,
    category: MATH,
    topics: [ALGEBRA]
  },
  {
    title: `How to understand the Floquet Theory?`,
    description: `I would also need some guidance on the basic understanding about the Floquet analysis. I am an engineering researcher, and may not have the essential mathematical background to easily understand the Floquet theory.`,
    category: MATH,
    topics: [CALCULUS]
  },

  /**
   * SCIENCE
   */
   {
    title: `Where does NADP+ come from?`,
    description: `Trying to understand Photosynthesis better. I understand the NADP+ is reduced to NADPH in light dependent reactions and NADPH is then recycled back into NADP+ in the Calvin cycle. What I don't understand is where does the NADP+ come from initially?`,
    category: SCIENCE,
    topics: [BIOLOGY]
   },
   {
    title: `What chemical effect does stress cause in the body that causes so many problems?`,
    description: `I'm the kind of person who tries to understand how things work fundamentally. Can someone explain what chemical effects can occur because of stress and how a neurological state causes those changes?`,
    category: SCIENCE,
    topics: [BIOLOGY]
   },
  {
    title: `How does NaCl maintain its crystalline structure?`,
    description: `My understanding is that NaCl is an ionic compound, in which Cl becomes (effectively) Cl− and Na becomes Na+. So I understand why I would get a "sea" of particles that would stick together. But why does the above mean that it will have a face centered cubic structure with the ions held in place so rigidly?`,
    category: SCIENCE,
    topics: [CHEMISTRY]
  },
  {
    title: `Will magnesium chloride and ascorbic acid react in solution?`,
    description: `Both magnesium chloride dissolved in distilled water and ascorbic acid dissolved in distillled water have been separately shown to have a number of health benefits when applied topically to the skin. I am wondering if these will react if they are both dissolved in the same container?`,
    category: SCIENCE,
    topics: [CHEMISTRY]
  },

  /**
  * DESIGN
  */
  {
    title: `Is there an dynamically changing font?`,
    description: `I'm thinking something that isn't perfectly monospaced/spaced, but as you type it organically lays out the font with random splines or something and random spacing, but the splines would be contained inside a shape of a letter that would also be randomly scaled and rotated just slightly across each character stroke.`,
    category: DESIGN,
    topics: [TYPOGRAPHY]
  },
  {
    title: `Identify Rounded Modern Sans Serif`,
    description: `Can anyone ID this font? It is giving me fits even though I feel like its on the tip of my tongue..`,
    category: DESIGN,
    topics: [TYPOGRAPHY]
  },
  {
    title: `How to make text fit to area text box in Illustrator CC`,
    category: DESIGN,
    topics: [ILLUSTRATOR, TYPOGRAPHY]
  },
  {
    title: `Help improving colors on logo design`,
    description: `Im in the process of design a logo for a project I'm working on, but I'm not a brand designer/specialist, I'm just a webdesigner.`,
    category: DESIGN,
    topics: [LOGO]
  },
  {
    title: `Optimal background for a mobile wallpaper?`,
    description: `I would appreciate feedback on the current background and how it is or isn't a good fit`,
    category: DESIGN,
    topics: [LOGO, ILLUSTRATOR]
  },

  /**
   * MUSIC
   */
  {
    title: `Is there a special term for this type of alternate picking?`,
    description: `I'm looking to see if there's a special word for a type of alternate picking commonly heard in metal that involves playing a series of notes on a lower string while also playing notes on a higher string in between.`,
    category: MUSIC,
    topics: [GUITAR, THEORY]
  },
  {
    title: `What setup do I need to hear my vocals and guitar through headphones while playing?`,
    description: `I know very little about electrical music equipment. If so, what would I need?`,
    category: MUSIC,
    topics: [GUITAR, EQUIPMENT]
  },
  {
    title: `How do you play a scale "in sixths" or "in thirds"?`,
    description: `What do these terms refer to? Does it mean the length of the note (in beats)?`,
    category: MUSIC,
    topics: [PIANO, THEORY]
  },
  {
    title: `What kind of practice leads to the ability to play the exact melody in my mind?`,
    description: `How can we acquire the ability to play a guitar or piano like singing (without thinking)? What kind of practice can help me achieve this goal ?`,
    category: MUSIC,
    topics: [THEORY]
  },
];

const feedbacks = [
  {
    rating: 2,
    content: "I don't think this instructor explained things well."
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
    rating: 5
  },
  {
    rating: 3,
    content:
      "It was sort of helpful, I don't feel like everything was clarified..."
  },
  {
    rating: 4,
    content: `thank you`
  },
  {
    rating: 3
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

const messages = [
  { content: `Hello there!` },
  { content: `Hi!!!` },
  { content: `do you understand the homework?` },
  { content: `How are you doing today?` },
  { content: `Im well, how are you?` },
  { content: `hey you!` },
  { content: `do you want to hang out after class?` },
  { content: `Hola!!` },
  { content: `was it helpful?` },
  { content: `Don't you love this cool new app?` },
  { content: `Como estas?` },
  { content: `well...???` },
  { content: `did you finish your assignment?` },
  { content: `aight.` },
  { content: `Have a good night!` },
  { content: `that's cute` },
  { content: `yoooo` },
  { content: `man I'll never understand this` },
  { content: `Hey are you still around?` },
  { content: `I could really use more help` },
  { content: `On my way!` },
  { content: `I need another classroom session` },
  { content: `how did you do on the test?` },
  { content: `I don't think I can make it today` },
  { content: `hey!` },
  { content: `would you please let me know asap?` },
  { content: `It's been such a long time!` },
  { content: `can we reschedule?` },
  { content: `Ok I'll see you there!` },
  { content: `That's good to hear.` },
  { content: `???` },
  { content: `what do you think?` },
  { content: `are you studying this topic?` },
  { content: `Can you help me out?` },
  { content: `I just need a few more minutes!` },
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
