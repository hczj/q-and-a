import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { removeUserTopic, fetchCategoryTopics } from '../../store';
import {
  Header,
  DashboardMenu,
  DashboardProfile,
  Inbox,
  Topics,
  Feedback,
  ActiveQuestions,
  Main,
  SingleFeedback
} from '../../components';
import { connect } from 'react-redux';

class Dashboard extends Component {
  setActiveTab = event => {
    const tabs = [...document.querySelectorAll('[data-target-tab]')];
    tabs.forEach(t => t.classList.remove('is-active'));
    event.target.parentElement.classList.add('is-active');
  };

  removeTopic = topicId => {
    this.props.deleteTopic(topicId);
  };

  render() {
    const {
      isLoading,
      user,
      isTeacher,
      topics,
      feedback,
      organization,
      categories
    } = this.props;
    if (isLoading) return null;
    return (
      <div>
        <Header title={`${isTeacher ? `Teacher` : `Student`} Dashboard`} />
        <DashboardMenu isTeacher={isTeacher} handleClick={this.setActiveTab} />
        <Switch>
          <Route
            exact
            path="/(dashboard|dashboard/main)"
            render={() => <Main user={user} isTeacher={isTeacher} />}
          />
          <Route
            path="/dashboard/profile"
            render={() => <DashboardProfile user={user} />}
          />
          <Route path="/dashboard/inbox" component={Inbox} />
          <Route
            path="/dashboard/topics"
            render={() => (
              <Topics
                topics={topics}
                isTeacher={isTeacher}
                organization={organization}
                categories={categories}
                removeTopic={this.removeTopic}
              />
            )}
          />
          <Route
            path="/dashboard/feedback/:feedbackId"
            component={SingleFeedback}
          />
          <Route
            path="/dashboard/feedback"
            render={() => <Feedback feedback={feedback} />}
          />

          <Route
            path="/dashboard/active-questions"
            component={ActiveQuestions}
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  deleteTopic: topicId => dispatch(removeUserTopic(topicId)),
  getCategoryTopics: () => dispatch(fetchCategoryTopics())
});

const mapState = state => {
  let { organization } = state.me || { organization: [] };

  return {
    isLoading: state.questions.isLoading,
    isTeacher: state.me.isTeacher,
    topics: state.me.topics,
    user: state.me,
    organization,
    categories: organization.categories
  };
};

export default connect(mapState, mapDispatch)(Dashboard);
