import React, { Component } from 'react';
import { Header, AnswerQuestionButton } from '../../components';
import { connect } from 'react-redux';
import { fetchQuestion } from '../../store';

class SingleQuestionView extends Component {
  componentDidMount() {
    this.props.getQuestion(this.props.match.params.questionId);
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { question, isLoading, isTeacher } = this.props;
    const { topics, description, title } = question;

    if (isLoading) return null;
    return (
      <div className="box">
        <a onClick={() => this.goBack()}>
          <span className="icon">
            <i className="fas fa-long-arrow-alt-left" />
          </span>
          <span>Back to Questions</span>
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
        {isTeacher && <AnswerQuestionButton />}
        <hr />
        {description}
      </div>
    );
  }
}

const mapState = state => ({
  isLoading: state.questions.isLoading,
  question: state.questions.active,
  isTeacher: state.me.isTeacher
});

const mapDispatch = dispatch => ({
  getQuestion: questionId => dispatch(fetchQuestion(questionId))
});

export default connect(mapState, mapDispatch)(SingleQuestionView);
