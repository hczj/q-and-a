import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, fetchThread } from '../../store';
import { Threads, MessageList, MessageForm, Header } from '../../components';

class Inbox extends Component {
  async componentDidMount() {
    await this.props.getThreads();
    if (this.props.threads[0].id) {
      await this.props.getThread(this.props.threads[0].id);
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
    const {
      isLoadingThreads,
      isLoadingThread,
      threads,
      thread,
      myId
    } = this.props;
    return (
      <Fragment>
        <Header title="Inbox" />
        <div className="inbox">
          <div className="columns is-gapless">
            <div className="column is-5">
              <div className="thread-list">
                <Threads
                  isLoading={isLoadingThreads}
                  threads={threads}
                  myId={myId}
                  handleClick={this.handleClick}
                />
              </div>
            </div>
            <div className="column is-7">
              <div className="thread">
                <MessageList
                  isLoading={isLoadingThread}
                  thread={thread}
                  myId={myId}
                />
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
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
