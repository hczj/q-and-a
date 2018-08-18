import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createClassroom } from '../../store';
import io from 'socket.io-client';
import { MediaContainer, ControlContainer } from '../../components';

class RoomView extends Component {
  getUserMedia = navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .catch(err => alert('getUserMedia() error: ' + err.name));

  socket = io.connect();

  componentDidMount() {
    const roomId = this.props.match.params.room;

    let questionId = 1,
      teacherId = 2;

    this.props.addRoom(roomId, questionId, teacherId);
  }

  render() {
    return (
      <Fragment>
        <MediaContainer
          media={media => (this.media = media)}
          socket={this.socket}
          getUserMedia={this.getUserMedia}
        />
        <ControlContainer
          socket={this.socket}
          media={this.media}
          getUserMedia={this.getUserMedia}
        />
      </Fragment>
    );
  }
}

const mapState = state => ({
  room: state.classroom.id
});

const mapDispatch = dispatch => ({
  addRoom: (room, questionId, teacherId) =>
    dispatch(createClassroom(room, questionId, teacherId))
});

export default connect(mapState, mapDispatch)(RoomView);
