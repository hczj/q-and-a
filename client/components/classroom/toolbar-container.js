import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setVideo, setAudio } from '../../store';
import Toolbar from './toolbar';

class ToolbarContainer extends Component {
  state = {
    sid: '',
    message: '',
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
    // console.log('props', this.props);
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
    socket.on('approve', ({ message, sid }) => {
      this.props.media.setState({ bridge: 'approve' });
      this.setState({ message, sid });
    });
    socket.emit('find');
    this.props.getUserMedia.then(stream => {
      this.localStream = stream;
      this.localStream.getVideoTracks()[0].enabled = this.state.video;
      this.localStream.getAudioTracks()[0].enabled = this.state.audio;
    });
  }

  handleInput = event => {
    this.setState({ [event.target.dataset.ref]: event.target.value });
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

  getContent = content => {
    console.log('getContent content', content)
    // return { __html: new Remarkable().render(content) };
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

  handleHangup = () => {
    this.props.media.hangup();
  }

  render() {
    return (
      <Toolbar
        {...this.state}
        toggleVideo={this.toggleVideo}
        toggleAudio={this.toggleAudio}
        getContent={this.getContent}
        send={this.send}
        handleHangup={this.handleHangup}
        handleInput={this.handleInput}
        handleInvitation={this.handleInvitation}
      />
    );
  }
}

const mapState = state => ({
  video: state.classrooms.video,
  audio: state.classrooms.audio
});

const mapDispatch = dispatch => ({
  setVideo: bool => dispatch(setVideo(bool)),
  setAudio: bool => dispatch(setAudio(bool))
});

export default connect(mapState, mapDispatch)(ToolbarContainer);
