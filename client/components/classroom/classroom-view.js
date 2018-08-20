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

  // componentWillMount() {
  //   console.log('location state room', this.props.location.state.room);
  //   this.props.getClassroom(this.props.location.state.room);
  // }

  async componentDidMount() {
    // console.log('location state room', this.props.location.state.room);
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
        />
        <ControlContainer
          mediaEvents={mediaEvents}
          // socket={this.socket}
          media={this.media}
          getUserMedia={this.getUserMedia}
        />
      </Fragment>
    );
  }
}

const mapState = state => ({
  classroom: state.classroom
});

const mapDispatch = dispatch => ({
  getClassroom: classroom => dispatch(fetchClassroom(classroom))
});

export default connect(mapState, mapDispatch)(ClassroomView);
