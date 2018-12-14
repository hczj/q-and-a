import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, fetchThread, createMessage } from '../../store';
import { Threads, MessageList, MessageForm, User } from '../../components';

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
    const { threads, thread, sendMessage } = this.props;
    if (!thread && !threads || !thread.sender && !thread.receiver) return null;

    return (
      <User>
        {({ id: myId }) => (
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
                  thread={thread}
                  myId={myId}
                />
              )}
              <MessageForm thread={thread} sendMessage={sendMessage} />
            </div>
          </div>
        )}
      </User>
    );
  }
}

const mapState = state => ({
  threads: state.threads.all,
  thread: state.thread
});

const mapDispatch = dispatch => ({
  getThreads: () => dispatch(fetchThreads()),
  getThread: threadId => dispatch(fetchThread(threadId)),
  sendMessage: data => dispatch(createMessage(data))
});

export default connect(mapState, mapDispatch)(Inbox);
