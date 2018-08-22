import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createFeedback } from '../../store';
import { Header, ValidateField } from '../../components';

class FeedbackForm extends Component {
  handleFeedbackSubmit = data => {
    const { addFeedback, questionId, studentId, teacherId } = this.props;
    const { rating, content } = data;

    addFeedback({ rating, content, questionId, studentId, teacherId });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;

    return (
      <div className="feedback-form">
        <Header title="Feedback" />
        <p>Please take a moment to leave feedback about your session.</p>
        <form onSubmit={handleSubmit(this.handleFeedbackSubmit)}>
          <Field
            label="Rating"
            name="rating"
            type="number"
            component="input"
            placeholder="On a scale from 1 to 5"
            min={1}
            max={5}
          />

          <Field
            label="Feedback"
            name="content"
            type="textarea"
            component="input"
          />

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Submit
              </button>
            </div>

            <div className="control">
              <button
                className="button is-light"
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  teacherId: state.classroom.teacherId,
  questionId: state.classroom.questionId,
  studentId: state.me.id
});

const mapDispatch = dispatch => ({
  addFeedback: data => dispatch(createFeedback(data))
});

FeedbackForm = connect(mapState, mapDispatch)(FeedbackForm);

export default reduxForm({
  form: 'feedback'
})(FeedbackForm);
