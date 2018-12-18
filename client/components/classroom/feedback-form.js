import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createFeedback, updateQuestion } from '../../store';
import { ValidateField } from '../../components';
import { validateFeedback } from '../reusable/validate-field';

class FeedbackForm extends Component {
  handleFeedbackSubmit = values => {
    const { rating, content } = values;
    const { addFeedback, classroom } = this.props;
    const questionId = classroom.question.id;
    const studentId = classroom.student.id;
    const teacherId = classroom.teacher.id;

    addFeedback({ rating, content, questionId, studentId, teacherId });
    this.closeQuestion(this.props.classroom.question);
  };

  closeQuestion = question => {
    question.isActive = false;
    this.props.setQuestionInactive(question);
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, classroom } = this.props;

    return (
      <div className="feedback-form modal">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <h3 className="title is-4 is-marginless">
              {`How was your session ${
                classroom && classroom.teacher
                  ? `with ${classroom.teacher.firstName}`
                  : `today`
              }?`}
            </h3>
            <form onSubmit={handleSubmit(this.handleFeedbackSubmit)}>
              <div className="field">
                <div className="control star-rating">
                  <div className="stars-wrapper">
                    <Field
                      id="star5"
                      name="rating"
                      component="input"
                      type="radio"
                      value="5"
                    />
                    <label htmlFor="star5" className="radio">
                      <span className="icon">
                        <i className="fas fa-star" />
                      </span>
                    </label>

                    <Field
                      id="star4"
                      name="rating"
                      component="input"
                      type="radio"
                      value="4"
                    />
                    <label htmlFor="star4" className="radio">
                      <span className="icon">
                        <i className="fas fa-star" />
                      </span>
                    </label>

                    <Field
                      id="star3"
                      name="rating"
                      component="input"
                      type="radio"
                      value="3"
                    />
                    <label htmlFor="star3" className="radio">
                      <span className="icon">
                        <i className="fas fa-star" />
                      </span>
                    </label>

                    <Field
                      id="star2"
                      name="rating"
                      component="input"
                      type="radio"
                      value="2"
                    />
                    <label htmlFor="star2" className="radio">
                      <span className="icon">
                        <i className="fas fa-star" />
                      </span>
                    </label>

                    <Field
                      id="star1"
                      name="rating"
                      component="input"
                      type="radio"
                      value="1"
                    />
                    <label htmlFor="star1" className="radio">
                      <span className="icon">
                        <i className="fas fa-star" />
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <Field
                label="Feedback"
                name="content"
                type="textarea"
                row={6}
                placeholder="Please leave any comments you'd like to share..."
                component={ValidateField}
              />

              <div className="field is-grouped">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-link"
                    disabled={pristine || submitting}
                  >
                    Submit
                  </button>
                </div>

                <div className="control">
                  <button
                    type="button"
                    className="button is-light"
                    onClick={reset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

FeedbackForm = reduxForm({
  form: 'addFeedback',
  validate: validateFeedback
})(FeedbackForm);

const mapState = state => ({
  classroom: state.classroom,
  studentId: state.me.id
});

const mapDispatch = dispatch => ({
  addFeedback: data => dispatch(createFeedback(data)),
  setQuestionInactive: question => dispatch(updateQuestion(question))
});

export default connect(mapState, mapDispatch)(FeedbackForm);
