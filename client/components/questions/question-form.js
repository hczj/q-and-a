import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  createQuestion,
  fetchCategoriesByUser,
  fetchCategory,
  removeActiveCategory
} from '../../store';
import { connect } from 'react-redux';
import {
  CategoryDropdown,
  Header,
  TopicsInput,
  ValidateField
  // validateQuestion
} from '../../components';
import pickBy from 'lodash.pickby';
import keys from 'lodash.keys';

import { validateQuestion } from '../reusable/validate-field';

class QuestionForm extends Component {
  componentDidMount() {
    const { removeActiveCategory } = this.props;
    removeActiveCategory();
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
    const { addQuestion } = this.props;
    const { title, description, categoryId, topic } = data;

    const strTopicIds = keys(pickBy(topic));
    const topicIds = strTopicIds.map(id => +id);

    addQuestion({ title, description, categoryId, topicIds });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, category } = this.props;

    return (
      <Fragment>
        <Header title="Ask a question!" />
        <form onSubmit={handleSubmit(this.handleQuestionSubmit)}>
          <Field
            label="Title"
            name="title"
            type="text"
            component={ValidateField}
          />

          <Field
            label="Description"
            name="description"
            type="textarea"
            component={ValidateField}
          />

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <div className="select">
                <Field
                  className="select"
                  name="categoryId"
                  component="select"
                  onChange={this.handleCategoryChange}
                >
                  <CategoryDropdown defaultOption="Select A Category" />
                </Field>
              </div>
            </div>
          </div>

          {category.name && (
            <div className="field">
              <label className="label">Topics</label>
              <TopicsInput />
            </div>
          )}

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
      </Fragment>
    );
  }
}

const mapState = state => ({
  categories: state.categories.all,
  category: state.categories.active
});

const mapDispatch = dispatch => ({
  addQuestion: data => dispatch(createQuestion(data)),
  getCategory: categoryId => dispatch(fetchCategory(categoryId)),
  removeActiveCategory: () => dispatch(removeActiveCategory())
});

QuestionForm = connect(mapState, mapDispatch)(QuestionForm);

export default reduxForm({
  form: 'question',
  validate: validateQuestion
})(QuestionForm);
