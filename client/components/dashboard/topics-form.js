import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  updateUserTopics,
  fetchCategoryTopics,
  removeAllCategories
} from '../../store';
import { connect } from 'react-redux';
import pickBy from 'lodash.pickby';
import keys from 'lodash.keys';

class TopicsForm extends Component {
  componentDidMount() {
    this.props.getCategoryTopics();
  }

  handleTopicsSubmit = data => {
    const { addTopics, getCategoryTopics } = this.props;
    const { topic } = data;

    const strTopicIds = keys(pickBy(topic));
    const topicIds = strTopicIds.map(id => +id);

    addTopics({ topicIds });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, topics } = this.props;

    return (
      <Fragment>
        <form onSubmit={handleSubmit(this.handleTopicsSubmit)}>
          <div className="field">
            {topics.map(topic => (
              <div className="field" key={topic.id}>
                <Field
                  component="input"
                  name={`topic.${topic.id}`}
                  type="checkbox"
                />
                <label>{topic.name}</label>
              </div>
            ))}
          </div>

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
  topics: state.categories.all
});

const mapDispatch = dispatch => ({
  getCategoryTopics: () => dispatch(fetchCategoryTopics()),
  addTopics: data => dispatch(updateUserTopics(data)),
  removeAllCategories: () => dispatch(removeAllCategories())
});

TopicsForm = connect(mapState, mapDispatch)(TopicsForm);

export default reduxForm({
  form: 'topic'
})(TopicsForm);
