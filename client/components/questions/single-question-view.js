import React, { Component } from 'react';
import { Header, AnswerQuestionButton, NothingHere } from '../../components';
import { connect } from 'react-redux';
import { fetchQuestion } from '../../store';
import { Link } from 'react-router-dom';

class SingleQuestionView extends Component {
  componentDidMount() {
    this.props.getQuestion(this.props.match.params.questionId);
  }

  render() {
    const { question, isLoading } = this.props;
    const { topics, description, title } = question;

    if (isLoading) return null;
    return (
      <div className="box">
        <Link to="/questions">
          <span className="icon">
            <i className="fas fa-long-arrow-alt-left" />
          </span>
          <span>Back to Questions</span>
        </Link>
        <Header title={title} />
        <div className="tags">
          {topics &&
            topics.map(topic => (
              <span key={topic.id} className="tag is-rounded">
                {topic.name}
              </span>
            ))}
        </div>
        <AnswerQuestionButton />
        <hr />
        {description}
      </div>
    );
  }
}

const mapState = state => ({
  isLoading: state.questions.isLoading,
  question: state.questions.active
});

const mapDispatch = dispatch => ({
  getQuestion: questionId => dispatch(fetchQuestion(questionId))
});

export default connect(mapState, mapDispatch)(SingleQuestionView);
