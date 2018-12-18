import React, { useContext } from 'react';
import { Router, Redirect } from '@reach/router';
import { MeContext } from './context';
import {
  Auth,
  PageNotFound,
  Manage,
  Questions,
  Dashboard,
  Profile,
  Inbox
} from './components';

const Routes = props => {
  const me = useContext(MeContext);
  const myId = me.id;
  const isLoggedIn = !!myId;

  return (
    <Router>
      <Dashboard path="dashboard/*" />
      <Questions path="questions/*" />
      <Inbox path="messages/*" />
      <Profile path="profile/:userId" />
      <Manage path="manage" />
      <Auth path="login" />
      <Auth path="signup" />
      <PageNotFound default />
    </Router>
  );

  // return (
  //   <Switch>
  //     <Route
  //       exact
  //       path="/"
  //       render={() => (
  //         <Redirect to={`/${isLoggedIn ? 'dashboard' : 'login'}`} />
  //       )}
  //     />
  //     {isLoggedIn && (
  //       <Switch>
  //         <Route path="/(login|signup)" render={() => <Redirect to="/dashboard" />} />
  //         <Route path="/manage" component={Manage} />
  //         <Route path="/dashboard" component={Dashboard} me={me} />
  //         <Route exact path="/ask-a-question" component={QuestionForm} />
  //         <Route exact path="/questions" component={QuestionQueue} />
  //         <Route
  //           path="/questions/question/:questionId"
  //           component={SingleQuestionView}
  //         />
  //         <Route exact path="/profile/:id" component={Profile} />
  //         <Route exact path="/messages" component={Inbox} />
  //       </Switch>
  //     )}

  //     <Route path="/(login|signup)" component={Auth} />
  //     <Route component={PageNotFound} />
  //   </Switch>
  // );
}

export default Routes;
