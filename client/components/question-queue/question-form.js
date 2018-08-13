import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  createQuestion,
  fetchCategoriesByUser,
  me,
  fetchCategory,
  removeActiveCategory
} from '../../store';
import { connect } from 'react-redux';
import { CategoryDropdown, Header, TopicsInput } from '../../components';
import _ from 'lodash';

class QuestionForm extends Component {
  async componentDidMount() {
    const { getUserCategories, loadMe, removeActiveCategory } = this.props;
    removeActiveCategory();
    await loadMe();
    getUserCategories(this.props.myId);
  }

  handleCategoryChange = event => {
    const categoryId = +event.target.value;
    const { removeActiveCategory, getCategory } = this.props;

    if (isNaN(categoryId)) {
      removeActiveCategory();
    } else {
      getCategory(categoryId);
    }
  };

  handleQuestionSubmit = data => {
    const { addQuestion, myId } = this.props;
    const { title, description, categoryId, topic } = data;

    const strTopicIds = _.keys(_.pickBy(topic));
    const topicIds = strTopicIds.map(id => +id);

    addQuestion({ title, description, categoryId, myId, topicIds });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, category } = this.props;

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
                <Field
                  className="select"
                  name="categoryId"
                  component="select"
                  onChange={this.handleCategoryChange}
                >
                  <CategoryDropdown />
                </Field>
              </div>
            </div>

            {category.name ? (
              <div className="field">
                <label className="label">Topics</label>
                <TopicsInput />
              </div>
            ) : (
              ''
            )}

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
  myId: state.me.id,
  categories: state.categories.all,
  category: state.categories.active
});

const mapDispatch = dispatch => ({
  loadMe: () => dispatch(me()),
  addQuestion: data => dispatch(createQuestion(data)),
  getUserCategories: myId => dispatch(fetchCategoriesByUser(myId)),
  getCategory: categoryId => dispatch(fetchCategory(categoryId)),
  removeActiveCategory: () => dispatch(removeActiveCategory())
});

QuestionForm = connect(mapState, mapDispatch)(QuestionForm);

export default reduxForm({
  form: 'question',
  validate
})(QuestionForm);
