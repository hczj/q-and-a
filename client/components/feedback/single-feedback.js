import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeedback } from '../../store';

class SingleFeedback extends Component {
  componentDidMount() {
    this.props.getFeedback(+this.props.match.params.feedbackId);
  }

  render() {
    const { isLoading, feedback, question } = this.props;
    if (isLoading || !question) return null;
    return (
      <div className="box">
        <div className="content">
          <p>Date: {new Date(feedback.createdAt).toLocaleDateString()}</p>
          <p>Rating: {feedback.rating}</p>
          <p>
            Student: {`${question.user.firstName} ${question.user.lastName}`}
          </p>
          <p>Question: {question.title}</p>
          <p>Feedback: {feedback.content}</p>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getFeedback: feedbackId => dispatch(fetchFeedback(feedbackId))
});

const mapState = state => {
  const { question } = state.feedback.active || { question: {} };
  return {
    isLoading: state.feedback.isLoading,
    feedback: state.feedback.active,
    question
  };
};

export default connect(mapState, mapDispatch)(SingleFeedback);
