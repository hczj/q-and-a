import React, { Component } from 'react';
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

class Dashboard extends Component {
  componentDidMount() {
    this.props.getQuestionsByUser();
    this.props.getFeedback();
  }

  removeTopic = topicId => {
    this.props.deleteTopic(topicId);
  };

  render() {
    const {
      user,
      isTeacher,
      feedback,
      questions,
      topics,
      organization
    } = this.props;
    return (
      <div>
        <Header title={`${isTeacher ? `Teacher` : `Student`} Dashboard`} />
        <div className="container">
          <section className="hero is-dark welcome is-small">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Hello, {user.firstName}.</h1>
                <h2 className="subtitle">I hope you are having a great day!</h2>
              </div>
            </div>
          </section>
          <section className="info-tiles">
            <div className="tile is-ancestor has-text-centered">
              <UsersOnline isTeacher={isTeacher} />
              <QuestionsOpen />
              {isTeacher ? (
                <AnswersToday isTeacher={isTeacher} />
              ) : (
                <QueueStatus />
              )}
            </div>
          </section>
          <div className="columns">
            <div className="column is-6">
              {isTeacher ? (
                <Feedback feedback={feedback} />
              ) : (
                <ActiveQuestions questions={questions} />
              )}
            </div>

            <div className="column is-6">
              <Topics
                topics={topics}
                isTeacher={isTeacher}
                removeTopic={this.removeTopic}
                organization={organization}
              />
              <AddATopic topics={topics} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  deleteTopic: topicId => dispatch(removeUserTopic(topicId)),
  getCategoryTopics: () => dispatch(fetchCategoryTopics()),
  getQuestionsByUser: () => dispatch(fetchQuestionsByUser()),
  getFeedback: () => dispatch(fetchAllFeedback())
});

const mapState = state => {
  let { organization } = state.me || { organization: [] };

  return {
    isTeacher: state.me.isTeacher,
    questions: state.questions.all,
    topics: state.me.topics,
    user: state.me,
    organization,
    categories: organization.categories,
    feedback: state.feedback.all
  };
};

export default connect(mapState, mapDispatch)(Dashboard);
