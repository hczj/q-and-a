import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createClassroom } from '../../store';
import io from 'socket.io-client';
import { MediaContainer, ControlContainer } from '../../components';

class ClassroomView extends Component {
  getUserMedia = navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .catch(err => alert('getUserMedia() error: ' + err.name));

  socket = io.connect();

  async componentDidMount() {
    const { location, addRoom } = this.props;
    addRoom(
      location.state.room,
      location.state.questionId,
      location.state.studentId,
      location.state.teacherId
    );
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
  room: state.classroom.room,
  questionId: state.classroom.questionId,
  studentId: state.classroom.studentId,
  teacherId: state.classroom.teacherId
});

const mapDispatch = dispatch => ({
  addRoom: (room, questionId, teacherId) =>
    dispatch(createClassroom(room, questionId, teacherId))
});

export default connect(mapState, mapDispatch)(ClassroomView);
