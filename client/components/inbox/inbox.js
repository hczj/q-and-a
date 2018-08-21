import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, fetchThread } from '../../store';
import Threads from './threads';
import MessageList from './message-list';
import MessageForm from './message-form';

class Inbox extends Component {
  async componentDidMount() {
    const { getThreads, getThread, threads, thread } = this.props;
    await getThreads();
    // TODO
    // look at the below code and see what is happening
    // it was working (loading threads and then the first thread
    // so it's messages fill the message list window). now it's not.
    if (!thread.id && threads[0]) {
      await getThread(threads[0].id);
    }
  }

  componentWillUnmount() {}
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
    return (
      <div className="inbox">
        <div className="columns is-gapless">
          <div className="column is-5">
            <div className="thread-list">
              <Threads
                threads={threads}
                myId={myId}
                handleClick={this.handleClick}
              />
            </div>
          </div>
          <div className="column is-7">
            <div className="thread">
              {thread && (
                <MessageList
                  isLoading={isLoadingThread}
                  thread={thread}
                  myId={myId}
                />
              )}
              <MessageForm />
            </div>
          </div>
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
