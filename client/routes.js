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
  SingleFeedback
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
          render={() =>
            isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
          }
        />
        {isLoggedIn && (
          <Switch>
            {/* LOGGED-IN ONLY ROUTES */}
            <Route path="/manage" component={Manage} />
            <Route path="/dashboard" component={Dashboard} {...this.props} />
            <Route exact path="/ask-a-question" component={QuestionForm} />
            <Route exact path="/questions" component={QuestionQueue} />
            <Route
              path="/questions/question/:questionId"
              component={SingleQuestionView}
            />
            <Route exact path="/profile/:id" component={Profile} />
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
