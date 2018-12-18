import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { Header, Button } from '../../components';
import { fetchQuestion } from '../../store';

class QuestionView extends Component {
  componentDidMount() {
    this.props.getQuestion(this.props.questionId);
  }

  goBack = () => {
    navigate('/questions');
  };

  render() {
    const { question, isLoading, isTeacher, myId } = this.props;
    const { topics, title, description, user } = question;
    if (isLoading || !user) return null;
    return (
      <div className="box">
        <a onClick={() => this.goBack()}>
          <span className="icon">
            <i className="fas fa-long-arrow-alt-left" />
          </span>
          <span>Back</span>
        </a>
        <Header title={title} />
        <div className="tags">
          {topics &&
            topics.map(topic => (
              <span key={topic.id} className="tag is-rounded">
                {topic.name}
              </span>
            ))}
        </div>
        {isTeacher && (
          <Button
            link="/classroom"
            text="Answer"
            classes="button is-link"
            state={{
              questionId: question.id,
              studentId: user.id,
              teacherId: myId
            }}
          />
        )}
        <hr />
        {description}
      </div>
    );
  }
}

const mapState = state => ({
  isLoading: state.questions.isLoading,
  myId: state.me.id,
  isTeacher: state.me.isTeacher,
  question: state.questions.active,
  user: state.users.active
});

const mapDispatch = dispatch => ({
  getQuestion: questionId => dispatch(fetchQuestion(questionId))
});

export default connect(mapState, mapDispatch)(QuestionView);
