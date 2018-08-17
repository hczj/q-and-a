import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import {
  Auth,
  PageNotFound,
  Manage,
  QuestionQueue,
  QuestionForm,
  Dashboard,
  CategoryPage,
  Profile,
  Inbox,
  ClassroomView,
  RoomView,
  SingleQuestionView,
  SingleThread
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
        {isLoggedIn && (
          <Switch>
            <Route exact path="/" component={Dashboard} />

            {/* LOGGED-IN ONLY ROUTES */}
            <Route path="/manage" component={Manage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/ask-a-question" component={QuestionForm} />
            <Route exact path="/questions" component={QuestionQueue} />
            <Route
              exact
              path="/questions/question/:questionId"
              component={SingleQuestionView}
            />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/inbox/thread/:id" component={SingleThread} />
          </Switch>
        )}

        <Route path="/(login|signup)" component={Auth} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

const mapState = state => ({
  isLoading: !!state.me.isLoading,
  isLoggedIn: !!state.me.id,
  isAdmin: !!state.me.isAdmin,
  myId: state.me.id
});

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
});

// `withRouter` makes sure updates are not blocked when url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
