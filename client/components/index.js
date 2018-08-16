// root
export { default as Navbar } from './navbar';
export { default as PageNotFound } from './page-not-found';
export { default as UserHome } from './user-home';

// admin
export { default as Manage } from './admin/manage';

// auth
export { Login, Signup } from './auth/auth-form';
export { default as Auth } from './auth/auth';

// classroom
// export { default as Classroom } from './classroom/classroom-main';
export { default as ClassroomView } from './classroom/classroom-view';
export { default as RoomView } from './classroom/room-view';
export { default as MediaContainer } from './classroom/media-container';
export { default as ControlContainer } from './classroom/control-container';

// comment
export { default as CommentCard } from './comment/comment-card';
export { default as CommentForm } from './comment/comment-form';

// dashboard
export { default as ActiveQuestions } from './dashboard/active-questions';
export { default as Dashboard } from './dashboard/dashboard';
export { default as LearnToday } from './dashboard/learn-today';
export { default as MyTopics } from './dashboard/my-topics';
export { default as Schedule } from './dashboard/schedule';

// discover
export { default as CategoryPage } from './discover/category-page';
export { default as CategoryTopics } from './discover/category-topics';
export { default as Discover } from './discover/discover';

// profile
export { default as ProfileCard } from './profile/profile-card';
export { default as ProfileTopics } from './profile/profile-topics';
export { default as Profile } from './profile/profile';

// questions
export {
  default as AnswerQuestionButton
} from './questions/answer-question-button';
export { default as AskQuestionButton } from './questions/ask-question-button';
export { default as QuestionForm } from './questions/question-form';
export { default as QuestionQueue } from './questions/question-queue';
export { default as Question } from './questions/question';
export { default as Queue } from './questions/queue';
export { default as TopicsInput } from './questions/topics-input';
export {
  default as SingleQuestionView
} from './questions/single-question-view';
export { default as UpvoteButton } from './questions/upvote-button';

//inbox
export { default as Inbox } from './inbox/inbox';
export { default as SingleThread } from './inbox/single-thread';

// reusable
export { default as CategoryCard } from './reusable/category-card';
export { default as CategoryDropdown } from './reusable/category-dropdown';
export { default as Header } from './reusable/header';
export { default as NothingHere } from './reusable/nothing-here';
export { default as QuestionCard } from './reusable/question-card';
export {
  default as ValidateField,
  validateLogin,
  validateSignup
} from './reusable/validate-field';
