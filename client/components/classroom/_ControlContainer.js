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
    audio: true,
    video: true
  };

  hideAuth = () => {
    this.props.handleStateChange({ bridge: 'connecting' });
  }

  async componentDidMount() {
    const { video, audio, media, handleStateChange } = this.props;

    this.setState({
      video: video,
      audio: audio
    });

    clientSocket.on('create', () => {
      console.log('**** SOCKET ON CREATE')
      handleStateChange({ user: 'host', bridge: 'create' })
      }
    );
    clientSocket.on('full', () => {
      console.log('**** SOCKET ON FULL');
      handleStateChange({ bridge: 'full' });
    });
    clientSocket.on('bridge', role => {
      console.log('**** SOCKET ON BRIDGE')
      media.init()
    });
    clientSocket.on('join', () => {
      console.log('**** SOCKET ON JOIN')
      handleStateChange({ user: 'guest', bridge: 'join' })
    });
    clientSocket.on('approve', ({ sid }) => {
      console.log('**** SOCKET ON APPROVE: sid -- ', sid)
      handleStateChange({ bridge: 'approve' });
      this.setState({ sid });
    });
    clientSocket.emit('find');
  }

  send = event => {
    event.preventDefault();
    clientSocket.emit('auth', this.state);
    this.hideAuth();
  }

  handleInvitation = event => {
    event.preventDefault();
    clientSocket.emit([event.target.dataset.ref], this.state.sid);
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

  handleExit = event => {
    event.preventDefault();
    clientSocket.emit('leave');
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
