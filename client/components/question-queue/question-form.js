import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { postQuestion } from '../../store';
import { connect } from 'react-redux';
// import TagsInput from 'react-tagsinput';

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  addQuestion: data => dispatch(postQuestion(data))
});

class QuestionForm extends Component {
  handleQuestionSubmit = data => {
    const { addQuestion, user } = this.props;
    const { title, description } = data;
    const userId = user.id;
    addQuestion({ title, description, userId });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleQuestionSubmit.bind(this))}>
        <label>Title:</label>
        <Field name="title" component={renderField} type="text" />

        <label>Description:</label>
        <Field name="description" component={renderField} type="text" />

        <button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        />
      </form>
    );
  }
}

// render form fields
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

// validation for form
const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Please enter a question!';
  }
  return errors;
};

QuestionForm = connect(mapState, mapDispatch)(QuestionForm);

export default reduxForm({
  form: 'question',
  validate
})(QuestionForm);
