import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setVideo, setAudio, deleteClassroom } from '../../store';
import Toolbar from './toolbar';
import Menu from './menu';
import Notification from './notification';

class ControlContainer extends Component {
  state = {
    sid: '',
    audio: true,
    video: true
  };

  hideAuth = () => {
    this.props.media.setState({ bridge: 'connecting' });
  }

  full = () => {
    this.props.media.setState({ bridge: 'full' });
  }

  componentDidMount() {
    const { socket, video, audio } = this.props;
    this.setState({
      video: video,
      audio: audio
    });

    socket.on('create', () =>
      this.props.media.setState({ user: 'host', bridge: 'create' })
    );
    socket.on('full', this.full);
    socket.on('bridge', role => this.props.media.init());
    socket.on('join', () =>
      this.props.media.setState({ user: 'guest', bridge: 'join' })
    );
    socket.on('approve', ({ sid }) => {
      this.props.media.setState({ bridge: 'approve' });
      this.setState({ sid });
    });
    socket.on('editor-toggle', () => {
      this.toggleEditor();
    });
    socket.on('wb-toggle', () => {
      this.toggleWhiteboard();
    });

    socket.emit('find');
    this.props.getUserMedia.then(stream => {
      this.localStream = stream;
      this.localStream.getVideoTracks()[0].enabled = this.state.video;
      this.localStream.getAudioTracks()[0].enabled = this.state.audio;
    });
  }

  send = event => {
    event.preventDefault();
    this.props.socket.emit('auth', this.state);
    this.hideAuth();
  }

  handleInvitation = event => {
    event.preventDefault();
    this.props.socket.emit([event.target.dataset.ref], this.state.sid);
    this.hideAuth();
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
    if (emit) this.props.socket.emit('wb-toggle-event');
    await this.props.media.setState((prevState, props) => {
      const hasWhiteboard = !prevState.whiteboard ? 'has-whiteboard' : '';
      return { whiteboard: hasWhiteboard }
    });
  }

  toggleEditor = async emit => {
    if (emit) this.props.socket.emit('editor-toggle-event');
    await this.props.media.setState((prevState, props) => {
      const hasEditor = !prevState.editor ? 'has-editor' : '';
      return { editor: hasEditor }
    });
  }

  handleExit = event => {
    event.preventDefault();
    this.props.socket.emit('leave');
    this.props.removeRoom();
    this.props.history.goBack();
  }

  handleHangup = () => {
    this.props.media.hangup();
  }

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
          send={this.send}
          handleInvitation={this.handleInvitation}
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
  video: state.classroom.video,
  audio: state.classroom.audio
});

const mapDispatch = dispatch => ({
  setVideo: bool => dispatch(setVideo(bool)),
  setAudio: bool => dispatch(setAudio(bool)),
  removeRoom: () => dispatch(deleteClassroom())
});

export default withRouter(connect(mapState, mapDispatch)(ControlContainer));
