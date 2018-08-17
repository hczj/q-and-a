import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { createMessage, fetchThread } from '../../store';
import { Header } from '../../components';
import MessageForm from './message-form';
import MessageList from './message-list';

class SingleThread extends Component {
  componentDidMount() {
    this.props.getThread(+this.props.match.params.id);
  }

  render() {
    const { messages, myId, thread, isLoading } = this.props;
    if (isLoading) return null;
    return (
      <Fragment>
        <Header title="Conversation" />
        <MessageList messages={messages} myId={myId} />
        <MessageForm />
      </Fragment>
    );
  }
}

const mapDispatch = dispatch => ({
  getThread: threadId => dispatch(fetchThread(threadId))
});

const mapState = state => {
  const { messages } = state.threads.active.thread || { messages: [] };
  return {
    myId: state.me.id,
    isLoading: state.threads.isLoading,
    thread: state.threads.active,
    messages
  };
};

export default connect(mapState, mapDispatch)(SingleThread);
