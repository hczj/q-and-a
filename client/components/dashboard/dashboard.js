import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  removeUserTopic,
  fetchCategoryTopics,
  fetchQuestionsByUser
} from '../../store';
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
import { EventEmitter } from 'events';
import clientSocket from '../../socket';
export const notificationEvents = new EventEmitter();

class Dashboard extends Component {
  componentDidMount() {
    this.props.getQuestionsByUser();
    clientSocket.on('connected', roomUrl => {
      console.log('THIS IS THE ROOM URL: ', roomUrl);
      this.notify(roomUrl);
    });
    if (!this.props.isTeacher) {
      notificationEvents.emit('notification-join-room', this.props.user.id);
    }
    Notification.requestPermission().then(function(result) {
      console.log(result);
    });
  }

  setActiveTab = event => {
    const tabs = [...document.querySelectorAll('[data-target-tab]')];
    tabs.forEach(t => t.classList.remove('is-active'));
    event.target.parentElement.classList.add('is-active');
  };

  notify = roomUrl => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      let notification = new Notification('Your Classroom is Ready!', {
        body: 'Click to Accept'
      });
      if (roomUrl) {
        notification.onclick = event => {
          event.preventDefault();
          window.open(roomUrl);
        };
      }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function(permission) {
        if (permission === 'granted') {
          let notification = new Notification('Your Classroom is Ready!', {
            body: 'Click to Accept'
          });
          if (roomUrl) {
            notification.onclick = event => {
              event.preventDefault();
              window.open(roomUrl);
            };
          }
        }
      });
    }
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
      categories,
      questions
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
            render={() => <ActiveQuestions questions={questions} />}
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  deleteTopic: topicId => dispatch(removeUserTopic(topicId)),
  getCategoryTopics: () => dispatch(fetchCategoryTopics()),
  getQuestionsByUser: () => dispatch(fetchQuestionsByUser())
});

const mapState = state => {
  let { organization } = state.me || { organization: [] };

  return {
    isLoading: state.questions.isLoading,
    isTeacher: state.me.isTeacher,
    questions: state.questions.all,
    topics: state.me.topics,
    user: state.me,
    organization,
    categories: organization.categories
  };
};

export default connect(mapState, mapDispatch)(Dashboard);
