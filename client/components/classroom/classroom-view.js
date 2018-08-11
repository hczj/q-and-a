import React, { Component } from 'react';
import Classroom from './classroom';
import { getUID } from '../../utils';

// const defaultRoomId = getUID();

class ClassroomView extends Component {
  defaultRoomId = getUID();
  state = { roomId: this.defaultRoomId };

  handleChange = event => {
    this.setState({ roomId: event.target.value });
  };

  render() {
    return (
      <Classroom
        defaultRoomId={this.defaultRoomId}
        roomId={this.state.roomId}
        handleChange={this.handleChange}
      />
    );
  }
}

export default ClassroomView;
