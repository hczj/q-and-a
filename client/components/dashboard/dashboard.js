import React, { Component, Fragment } from 'react';
import {
  removeUserTopic,
  fetchCategoryTopics,
  fetchQuestionsByUser,
  fetchAllFeedback
} from '../../store';
import {
  Header,
  UsersOnline,
  QuestionsOpen,
  AnswersToday,
  ActiveQuestions,
  Feedback,
  Topics,
  AddATopic,
  QueueStatus
} from '../../components';
import { connect } from 'react-redux';
import { EventEmitter } from 'events';
import clientSocket from '../../socket';
export const notificationEvents = new EventEmitter();

class Dashboard extends Component {
  componentDidMount() {
    this.props.getQuestionsByUser();
    this.props.getFeedback();

    clientSocket.on('connected', roomUrl => this.notify(roomUrl));

    if (!this.props.isTeacher) {
      notificationEvents.emit('notification-join-room', this.props.user.id);
    }

    Notification.requestPermission().then(result => console.log(result));
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
      const notification = new Notification('You have been invited to a classroom!', {
        body: 'Click to Accept'
      });
      if (roomUrl) {
        notification.onclick = event => {
          event.preventDefault();
          window.open(roomUrl);
        };
      }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          const notification = new Notification('You have been invited to a classroom!', {
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
    const { user, isTeacher, feedback, questions, topics } = this.props;
    return (
      <Fragment>
        <Header title={`${isTeacher ? `Teacher` : `Student`} Dashboard`} />
        <div className="dashboard">
            <section className="dashboard-welcome">
                  <p className="title">
                    Hello, {user.firstName}!
                  </p>
                  <p className="subtitle">
                    We hope you are having a great day!
                  </p>
            </section>

            <section className="tile is-ancestor">
              <div className="is-vertical tile">
                <div className="tile dashboard-callouts">
                  <div className="is-parent is-vertical tile">
                    <UsersOnline isTeacher={isTeacher} />
                  </div>
                  <div className="tile is-parent">
                    <QuestionsOpen />
                  </div>
                  <div className="tile is-parent">
                    {isTeacher ? (
                      <AnswersToday isTeacher={isTeacher} />
                    ) : (
                      <QueueStatus />
                    )}
                  </div>
                </div>
                <div className="tile">
                  <div className="tile is-parent">
                    {isTeacher ? (
                      <Feedback feedback={feedback} />
                    ) : (
                      <ActiveQuestions questions={questions} />
                    )}
                  </div>
                  <div className="tile is-parent is-vertical">
                    <Topics
                      topics={topics}
                      isTeacher={isTeacher}
                      removeTopic={this.removeTopic}
                    />
                    <AddATopic />
                  </div>
                </div>
              </div>
            </section>
        </div>
      </Fragment>
    );
  }
}

const mapDispatch = dispatch => ({
  deleteTopic: topicId => dispatch(removeUserTopic(topicId)),
  getCategoryTopics: () => dispatch(fetchCategoryTopics()),
  getQuestionsByUser: () => dispatch(fetchQuestionsByUser()),
  getFeedback: () => dispatch(fetchAllFeedback())
});

const mapState = state => ({
  isTeacher: state.me.isTeacher,
  questions: state.questions.all,
  topics: state.me.topics,
  user: state.me,
  feedback: state.feedback.all
});

export default connect(mapState, mapDispatch)(Dashboard);
