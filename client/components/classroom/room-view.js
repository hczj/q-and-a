import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createClassroom } from '../../store';
import io from 'socket.io-client';
import { MediaContainer, ToolbarContainer } from '../../components';

class RoomView extends Component {
  getUserMedia = navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .catch(err => alert('getUserMedia() error: ' + err.name));

  socket = io.connect();

  componentDidMount() {
    this.props.addRoom(this.props.match.params.room);
  }

  render() {
    return (
      <Fragment>
        <MediaContainer
          media={media => (this.media = media)}
          socket={this.socket}
          getUserMedia={this.getUserMedia}
        />
        <ToolbarContainer
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
  addRoom: room => dispatch(createClassroom(room))
});

export default connect(mapState, mapDispatch)(RoomView);
