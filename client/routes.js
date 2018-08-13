import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import {
  Auth,
  UserHome,
  PageNotFound,
  Manage,
  QuestionQueue,
  QuestionForm,
  Dashboard,
  CategoryPage,
  Discover,
  Profile,


  ClassroomView,
  Classroom,
  RoomView
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
        <Route exact path="/" component={UserHome} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/category/:categoryId" component={CategoryPage} />

        {isLoggedIn && (
          <Switch>
            {/* LOGGED-IN ONLY ROUTES */}
            <Route path="/manage" component={Manage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/ask-a-question" component={QuestionForm} />
            <Route exact path="/question-queue" component={QuestionQueue} />
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
