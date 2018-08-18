import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, fetchThread } from '../../store';
import Threads from './threads';
import MessageList from './message-list';

class Inbox extends Component {
  componentDidMount() {
    this.props.getThreads();
  }

  handleClick = (thread) => {
    console.log('thread', thread)
    // console.log('event', event.target)
    // this.props.history.push(`/inbox/thread/${threadId}`);
    this.props.getThread(thread.id);
  };

  render() {
    const { isLoading, threads, thread, myId } = this.props;
    if (isLoading) return null;
    return (
      <div className="columns">
        <div className="column is-4">
          <Threads threads={threads} handleClick={this.handleClick} />
        </div>
        <div className="column is-8">
          <MessageList thread={thread} myId={myId} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  isLoading: state.threads.isLoading,
  threads: state.threads.all,
  thread: state.threads.active
});

const mapDispatch = dispatch => ({
  getThreads: () => dispatch(fetchThreads()),
  getThread: threadId => dispatch(fetchThread(threadId))
});

export default connect(mapState, mapDispatch)(Inbox);
