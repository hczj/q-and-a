import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { createMessage, fetchThread } from '../../store';
import MessageForm from './sendMessage';
import MessageList from './messageList';

class SingleThread extends Component {
  async componentDidMount() {
    await this.props.getThread(+this.props.match.params.id);
  }

  render() {
    const { messages, myId, thread } = this.props;
    return (
      <Fragment>
        <MessageList messages={messages} myId={myId} />
        <MessageForm />
      </Fragment>
    );
  }
}

const mapDispatch = dispatch => ({
  getThread: threadId => dispatch(fetchThread(threadId)),
  sendMessage: message => dispatch(createMessage(message))
});

const mapState = state => {
  const { messages } = state.threads.active.thread || { messages: [] };
  return {
    myId: state.me.id,
    isLoadingActive: state.threads.isLoadingActive,
    thread: state.threads.active,
    messages
  };
};

export default connect(mapState, mapDispatch)(SingleThread);
