import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createClassroom, fetchClassroom } from '../../store';
import { MediaContainer, ControlContainer } from '../../components';
import { EventEmitter } from 'events';
export const mediaEvents = new EventEmitter();

class ClassroomView extends Component {
  getUserMedia = navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .catch(err => alert('getUserMedia() error: ' + err.name));

  async componentDidMount() {
    await this.props.getClassroom(this.props.match.params.room);
    mediaEvents.emit('find-room', this.props.match.params.room);
  }

  render() {
    return (
      <Fragment>
        <MediaContainer
          media={media => (this.media = media)}
          mediaEvents={mediaEvents}
          getUserMedia={this.getUserMedia}
          classroom={this.props.classroom}
          myId={this.props.myId}
        />
        <ControlContainer
          mediaEvents={mediaEvents}
          media={this.media}
          getUserMedia={this.getUserMedia}
          myId={this.props.myId}
        />
      </Fragment>
    );
  }
}

const mapState = state => ({
  myId: state.me.id,
  classroom: state.classroom
});

const mapDispatch = dispatch => ({
  getClassroom: classroom => dispatch(fetchClassroom(classroom))
});

export default connect(mapState, mapDispatch)(ClassroomView);
