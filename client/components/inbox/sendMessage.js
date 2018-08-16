import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createMessage } from '../../store';

class MessageForm extends Component {
  handleMessageSubmit = data => {
    const { sendMessage, id } = this.props;
    sendMessage({ content: data.content, threadId: id });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleMessageSubmit.bind(this))}
      >
        <div className="field">
          <Field
            className="input"
            name="content"
            type="text"
            component="input"
          />
          <button className="button is-link" type="submit">
            Send
          </button>
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
  form: 'message'
})(MessageForm);
