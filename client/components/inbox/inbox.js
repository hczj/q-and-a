import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, fetchThread } from '../../store';
import { Threads, MessageList, MessageForm, Header } from '../../components';

class Inbox extends Component {
  async componentDidMount() {
    await this.props.getThreads();
  }

  handleClick = (event, thread) => {
    [...document.querySelectorAll('.thread-list-item')].map(el => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      }
    });
    event.currentTarget.classList.add('is-active');
    this.props.getThread(thread.id);
  };

  render() {
    const { isLoadingThread, threads, thread, myId } = this.props;
    if (!thread && !threads) return null;
    if (!thread.sender && !thread.receiver) return null;
    const notMe =
      thread.senderId === myId ? thread.receiver.name : thread.sender.name;
    return (
      <div className="inbox">
        <div className="thread-list">
          <div className="thread-header">
            <span>Messages</span>
          </div>
          <Threads
            threads={threads}
            myId={myId}
            handleClick={this.handleClick}
          />
        </div>
        <div className="thread">
          {thread && (
            <MessageList
              isLoading={isLoadingThread}
              thread={thread}
              myId={myId}
              notMe={notMe}
            />
          )}
          <MessageForm />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  threads: state.threads.all,
  isLoadingThreads: state.threads.isLoading,
  thread: state.thread,
  isLoadingThread: state.thread.isLoading
});

const mapDispatch = dispatch => ({
  getThreads: () => dispatch(fetchThreads()),
  getThread: threadId => dispatch(fetchThread(threadId))
});

export default connect(mapState, mapDispatch)(Inbox);
