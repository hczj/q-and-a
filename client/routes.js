import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  Auth,
  PageNotFound,
  Manage,
  QuestionQueue,
  QuestionForm,
  Dashboard,
  Profile,
  SingleQuestionView,
  Inbox,
  FeedbackForm
} from './components';
import { me } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Redirect to={`/${isLoggedIn ? 'dashboard' : 'login'}`} />
          )}
        />
        {isLoggedIn && (
          <Switch>
            {/* LOGGED-IN ONLY ROUTES */}
            <Route path="/(login|signup)" render={() => <Redirect to="/dashboard" />} />
            <Route path="/manage" component={Manage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/ask-a-question" component={QuestionForm} />
            <Route exact path="/questions" component={QuestionQueue} />
            <Route
              path="/questions/question/:questionId"
              component={SingleQuestionView}
            />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/messages" component={Inbox} />
          </Switch>
        )}

        <Route path="/(login|signup)" component={Auth} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.me.id,
  isLoading: state.me.isLoading,
  isAdmin: state.me.isAdmin,
  myId: state.me.id
});

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
});

// `withRouter` makes sure updates are not blocked when url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
