import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  createQuestion,
  fetchCategoriesByUser,
  fetchCategory,
  removeActiveCategory
} from '../../store';
import {
  CategoryDropdown,
  Header,
  TopicsInput,
  ValidateField
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

  handleQuestionSubmit = values => {
    const { title, description, categoryId, topic } = values;
    const { addQuestion } = this.props;

    const strTopicIds = keys(pickBy(topic));
    const topicIds = strTopicIds.map(id => +id);

    addQuestion({ title, description, categoryId, topicIds });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, category } = this.props;

    return (
      <Fragment>
        <Header title="Ask a question" />
        <div className="box">
          <form onSubmit={handleSubmit(this.handleQuestionSubmit)}>
            <Field
              label="Title"
              name="title"
              type="text"
              placeholder="What's your question? Be specific."
              component={ValidateField}
            />

            <Field
              label="Description"
              name="description"
              type="textarea"
              rows={10}
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
                <button
                  type="submit"
                  className="button is-link"
                  disabled={pristine || submitting}
                >
                  Submit
                </button>
              </div>

              <div className="control">
                <button type="button" className="button is-light" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

QuestionForm = reduxForm({
  form: 'addQuestion',
  validate: validateQuestion
})(QuestionForm);

const mapState = state => ({
  categories: state.categories.all,
  category: state.categories.active
});

const mapDispatch = dispatch => ({
  addQuestion: data => dispatch(createQuestion(data)),
  getCategory: categoryId => dispatch(fetchCategory(categoryId)),
  removeActiveCategory: () => dispatch(removeActiveCategory())
});

export default connect(mapState, mapDispatch)(QuestionForm);
