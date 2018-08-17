import React, { Component } from 'react';
import { fetchAllFeedback } from '../../store';
import { connect } from 'react-redux';
import { FeedbackTable } from '../../components';

class Feedback extends Component {
  componentDidMount() {
    this.props.getAllFeedback();
  }

  render() {
    const { feedback, isLoading } = this.props;
    if (isLoading) return null;
    return (
      <div className="box">
        <FeedbackTable feedback={feedback} />
      </div>
    );
  }
}

const mapState = state => ({
  feedback: state.feedback.all
});

const mapDispatch = dispatch => ({
  getAllFeedback: () => dispatch(fetchAllFeedback())
});

export default connect(mapState, mapDispatch)(Feedback);
