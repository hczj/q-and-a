import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createQuestion } from '../../store';
import { connect } from 'react-redux';
import { CategoryDropdown, Header } from '../../components';
// import TagsInput from 'react-tagsinput';

class QuestionForm extends Component {
  handleQuestionSubmit = data => {
    const { addQuestion, myId } = this.props;
    const { title, description, categoryId } = data;
    addQuestion({ title, description, categoryId, myId });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <Fragment>
        <Header title="Ask a question!" />
        <form onSubmit={handleSubmit(this.handleQuestionSubmit.bind(this))}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <Field
                className="input"
                name="title"
                component={renderField}
                type="text"
              />
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <Field
                  className="input"
                  name="description"
                  component={renderField}
                  type="text"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <Field className="select" name="categoryId" component="select">
                  <CategoryDropdown />
                </Field>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Submit
                </button>
              </div>

              <div className="control">
                <button
                  className="button is-link"
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
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

const mapState = state => ({
  myId: state.me.id
});

const mapDispatch = dispatch => ({
  addQuestion: data => dispatch(createQuestion(data))
});

QuestionForm = connect(mapState, mapDispatch)(QuestionForm);

export default reduxForm({
  form: 'question',
  validate
})(QuestionForm);
