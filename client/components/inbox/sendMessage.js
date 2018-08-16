import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';

import { createMessage } from '../../store';
import { connect } from 'react-redux';

class MessageForm extends Component {
  handleMessageSubmit = data => {
    console.log('THIS.PROPS', this.props);
    const { sendMessage, id } = this.props;
    const { content } = data;
    sendMessage({ content, threadId: id });
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
  return {
    id
  };
};

const mapDispatch = dispatch => ({
  sendMessage: data => dispatch(createMessage(data))
});

MessageForm = connect(mapState, mapDispatch)(MessageForm);

export default reduxForm({
  form: 'message'
})(MessageForm);
