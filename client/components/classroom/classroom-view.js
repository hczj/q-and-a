import React, { Component } from 'react';
import { connect } from 'react-redux';
import Classroom from './classroom';
import { getRoomId } from '../../utils';
import { me } from '../../store';

class ClassroomView extends Component {
  state = { roomId: '' };

  async componentDidMount() {
    await this.props.loadInitialData();
    this.setState({ roomId: getRoomId(this.props.myId) })
  }

  render() {
    return <Classroom roomId={this.state.roomId} />;
  }
}

const mapState = state => ({ myId: state.me.id });

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
});

export default connect(mapState, mapDispatch)(ClassroomView);
