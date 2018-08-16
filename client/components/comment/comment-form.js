import React, { Component, Fragment } from 'react';
import { Header } from '../../components';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createComment } from '../../store';

class CommentForm extends Component {
  handleCommentSubmit = data => {
    const { addComment, questionId } = this.props;
    const { content } = data;
    addComment({ content, questionId });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;

    return (
      <Fragment>
        <Header text="Your Comment" />
        <form onSubmit={handleSubmit(this.handleCommentSubmit.bind(this))}>
          <div className="field">
            <div className="control">
              <Field
                className="textarea"
                name="content"
                component="textarea"
                type="textarea"
                placeholder="Add a comment..."
              />
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit" >
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

const mapDispatch = dispatch => ({
  addComment: data => dispatch(createComment(data))
});

CommentForm = connect(null, mapDispatch)(CommentForm);

export default reduxForm({
  form: 'comment'
})(CommentForm);
