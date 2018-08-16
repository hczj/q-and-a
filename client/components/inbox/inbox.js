import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, createMessage, fetchThread } from '../../store';
import Threads from './threads';
import SingleThread from './single-thread';

class Inbox extends Component {
  async componentDidMount() {
    await this.props.getThreads();
    console.log(this.props.threads);
  }

  handleClick = () => {};

  render() {
    if (this.props.isLoadingAll) return null;
    return (
      <div className="columns">
        <div className="column is-centered">
          <Threads handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  isLoadingAll: state.threads.isLoadingAll,
  isLoadingActive: state.threads.isLoadingActive,
  thread: state.threads.active,
  threads: state.threads.all
});

const mapDispatch = dispatch => ({
  getThreads: () => dispatch(fetchThreads()),
  sendMessage: message => dispatch(createMessage(message))
});

export default connect(mapState, mapDispatch)(Inbox);
