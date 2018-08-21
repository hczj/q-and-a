import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setVideo, setAudio, deleteClassroom } from '../../store';
import Toolbar from './toolbar';
import Menu from './menu';
import Notification from './notification';
import clientSocket from '../../socket';

class ControlContainer extends Component {
  state = {
    sid: '',
    message: '',
    audio: true,
    video: true
  };

  componentDidMount() {
    const { video, audio, mediaEvents, getUserMedia } = this.props;
    this.setState({
      video: video,
      audio: audio
    });

    clientSocket.on('rtc-approve--from-server', ({ message, sid }) => {
      this.setState({ message, sid });
    });

    mediaEvents.on('editor-toggle--from-server', () => {
      this.toggleEditor();
    });

    mediaEvents.on('wb-toggle', () => {
      this.toggleWhiteboard();
    });

    getUserMedia.then(stream => {
      this.localStream = stream;
      this.localStream.getVideoTracks()[0].enabled = this.state.video;
      this.localStream.getAudioTracks()[0].enabled = this.state.audio;
    });
  }

  startCall = event => {
    event.preventDefault();
    this.props.media.setState({ bridge: 'connecting' });
    this.props.mediaEvents.emit('rtc-auth', this.state);
  };

  handleInvitation = event => {
    event.preventDefault();
    // emit either `rtc-accept` or `rtc-reject` from the event
    this.props.mediaEvents.emit([event.target.dataset.ref], this.state.sid);
  }

  toggleVideo = () => {
    const video = (this.localStream.getVideoTracks()[0].enabled = !this.state
      .video);
    this.setState({ video: video });
    this.props.setVideo(video);
  };

  toggleAudio = () => {
    const audio = (this.localStream.getAudioTracks()[0].enabled = !this.state
      .audio);
    this.setState({ audio: audio });
    this.props.setAudio(audio);
  };

  toggleWhiteboard = async emit => {
    if (emit) this.props.mediaEvents.emit('wb-toggle-event');
    await this.props.media.setState((prevState, props) => {
      const hasWhiteboard = !prevState.whiteboard ? 'has-whiteboard' : '';
      return { whiteboard: hasWhiteboard }
    });
  }

  toggleEditor = async emit => {
    if (emit) this.props.mediaEvents.emit('editor-toggle-event');
    await this.props.media.setState((prevState, props) => {
      const hasEditor = !prevState.editor ? 'has-editor' : '';
      return { editor: hasEditor }
    });
  };

  goBack = (event, num = -1) => {
    event.preventDefault();
    this.props.history.go(num);
  }

  handleExit = event => {
    event.preventDefault();
    this.props.mediaEvents.emit('rtc-hangup');
    this.props.removeRoom(this.props.match.params.room);
    this.props.history.go(-2);
  }

  handleHangup = () => {
    this.props.media.hangup();
  };

  render() {
    return (
      <Fragment>
        <Menu
          {...this.state}
          toggleWhiteboard={this.toggleWhiteboard}
          toggleEditor={this.toggleEditor}
        />
        <Notification
          {...this.state}
          startCall={this.startCall}
          handleInvitation={this.handleInvitation}
          goBack={this.goBack}
        />
        <Toolbar
          {...this.state}
          toggleVideo={this.toggleVideo}
          toggleAudio={this.toggleAudio}
          handleExit={this.handleExit}
          handleHangup={this.handleHangup}
        />
      </Fragment>
    );
  }
}

const mapState = state => ({
  room: state.classroom.room,
  question: state.classroom.question,
  student: state.classroom.student,
  teacher: state.classroom.teacher,
  video: state.classroom.video,
  audio: state.classroom.audio
});

const mapDispatch = dispatch => ({
  setVideo: bool => dispatch(setVideo(bool)),
  setAudio: bool => dispatch(setAudio(bool)),
  removeRoom: room => dispatch(deleteClassroom(room))
});

export default withRouter(connect(mapState, mapDispatch)(ControlContainer));
