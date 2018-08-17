import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchThreads } from '../../store';
import Threads from './threads';

class Inbox extends Component {
  componentDidMount() {
    this.props.getThreads();
  }

  render() {
    const { isLoading, threads } = this.props;
    if (isLoading) return null;
    return (
      <div className="columns">
        <div className="column is-centered">
          <Threads threads={threads} />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  isLoading: state.threads.isLoading,
  threads: state.threads.all
});

const mapDispatch = dispatch => ({
  getThreads: () => dispatch(fetchThreads())
});

export default connect(mapState, mapDispatch)(Inbox);
