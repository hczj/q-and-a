import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createMessage } from '../../store';
import { ValidateField } from '../../components';
import { validateMessage } from '../reusable/validate-field';

class MessageForm extends Component {
  handleMessageSubmit = data => {
    const { sendMessage, id } = this.props;
    sendMessage({ content: data.content, threadId: id });
  };

  render() {
    const { handleSubmit, error, pristine, submitting, history } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleMessageSubmit)}>
        <Field
          label="Message"
          name="content"
          type="textarea"
          component={ValidateField}
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className="button is-link"
              disabled={pristine || submitting}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapState = state => {
  const { id } = state.threads.active.thread || { id: 0 };
  return { id };
};

const mapDispatch = dispatch => ({
  sendMessage: data => dispatch(createMessage(data))
});

MessageForm = connect(mapState, mapDispatch)(MessageForm);

export default reduxForm({
  form: 'message',
  validate: validateMessage
})(MessageForm);
