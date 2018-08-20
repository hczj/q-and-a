import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createClassroom } from '../../store';
import { MediaContainerNEW, ControlContainerNEW } from '../../components';
import { EventEmitter } from 'events';
export const mediaEvents = new EventEmitter();

class ClassroomView extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      bridge: ''
    };

    this.localVideo = null;
    this.remoteVideo = null;

    this.offerSdp = null;
    this.answerSdp = null;

    this.localPeerConnection = null;
    this.remotePeerConnection = null;
    this.localStream = null;
    this.sendChannel = null;
    this.receiveChannel = null;

    this.dataChannelDataReceived = null;
    this.dataChannelOptions = { ordered: true };
    this.dataChannelCounter = 0;
    this.sendDataLoop = null;

    this.offerOptions = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    };
  }

  handleStateChange = newState => {
    this.setState(newState);
  }

  componentWillMount() {
    window.RTCPeerConnection =
      window.RTCPeerConnection || window.webkitRTCPeerConnection;
    this.media = this;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.media = null;
    if (this.localStream !== undefined) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    mediaEvents.emit('leave');
  }

  init = async () => {
    try {
      const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
      // console.log('available devices: ', enumerateDevices);
    } catch (err) {
      console.log('navigator.enumerateDevices error: ', err);
    }

    // SHOULD WE ASSIGN ALL CONTROL BUTTONS TO VARIABLES HERE?

    this.localVideo = document.getElementById('is-local');
    this.remoteVideo = document.getElementById('is-remote');

    await this.getMedia();
    await this.createPeerConnection();
    await this.createOffer();
    // await this.setOffer();
    // await this.createAnswer();
    // await this.setAnswer();
  };

  getMedia = async () => {
    if (this.localStream) {
      this.localVideo.srcObject = null;
      this.localStream.getTracks().forEach(track => track.stop());
    }
    const constraints = { audio: true, video: true };
    console.log('Requested local stream');
    try {
      const userMedia = await navigator.mediaDevices.getUserMedia(constraints);
      this.gotStream(userMedia);
    } catch (err) {
      console.log('navigator.getUserMedia error: ', err);
    }
  };

  gotStream = stream => {
    console.log('Received local stream');
    this.localVideo.srcObject = stream;
    this.localStream = stream;
  };

  createPeerConnection = () => {
    console.log('Starting call');
    const videoTracks = this.localStream.getVideoTracks();
    const audioTracks = this.localStream.getAudioTracks();

    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}`);
    }

    if (audioTracks.length > 0) {
      console.log(`Using audio device: ${audioTracks[0].label}`);
    }

    const servers = null;

    this.localPeerConnection = new RTCPeerConnection(servers);
    console.log('Created local peer connection obj `localPeerConnection`');
    this.localPeerConnection.onicecandidate = e => {
      this.onIceCandidate(this.localPeerConnection, e);
    };
    this.sendChannel = this.localPeerConnection.createDataChannel(
      'sendDataChannel',
      this.dataChannelOptions
    );
    this.sendChannel.onopen = this.onSendChannelStateChange;
    this.sendChannel.onclose = this.onSendChannelStateChange;
    this.sendChannel.onerror = this.onSendChannelStateChange;

    this.remotePeerConnection = new RTCPeerConnection(servers);
    console.log('Created remote peer connection obj `remotePeerConnection`');
    this.remotePeerConnection.onicecandidate = e => {
      this.onIceCandidate(this.remotePeerConnection, e);
    };
    this.remotePeerConnection.ontrack = this.gotRemoteStream;
    this.remotePeerConnection.ondatachannel = this.receiveChannelCallback;

    this.localStream.getTracks().forEach(track => {
      this.localPeerConnection.addTrack(track, this.localStream);
    });
    console.log('Adding local stream to peer connection');
  };

  onSetSessionDescriptionSuccess = () => {
    console.log('Set session description success.');
  };

  onSetSessionDescriptionError = err => {
    console.log(`Failed to set session description: ${err.toString()}`);
  };

  createOffer = async () => {
    try {
      const offer = await this.localPeerConnection.createOffer(
        this.offerOptions
      );
      this.offerSdp = offer.sdp;
    } catch (err) {
      this.onCreateSessionDescriptionError(err);
    }
  };

  onCreateSessionDescriptionError = err => {
    console.log(`Failed to create session description: ${err.toString()}`);
  };

  setOffer = async () => {
    const offer = {
      type: 'offer',
      sdp: this.offerSdp
    };
    // console.log(`Modified Offer from localPeerConnection\n${this.offerSdp}`);

    try {
      await this.localPeerConnection.setLocalDescription(offer);
      this.onSetSessionDescriptionSuccess();
    } catch (err) {
      this.onSetSessionDescriptionError(err);
    }

    try {
      await this.remotePeerConnection.setRemoteDescription(offer);
      this.onSetSessionDescriptionSuccess();
    } catch (err) {
      this.onSetSessionDescriptionError(err);
    }
  };

  createAnswer = async () => {
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    try {
      const answer = await this.remotePeerConnection.createAnswer();
      this.answerSdp = answer.sdp;
    } catch (err) {
      this.onCreateSessionDescriptionError(err);
    }
  };

  setAnswer = async () => {
    // let sdp = answerSdpTextarea.value;
    const answer = {
      type: 'answer',
      sdp: this.answerSdp
    };

    try {
      await this.remotePeerConnection.setLocalDescription(answer);
      this.onSetSessionDescriptionSuccess();
    } catch (err) {
      this.onSetSessionDescriptionError(err);
    }

    // console.log(`Modified Answer from remotePeerConnection\n${this.answerSdp}`);
    try {
      await this.localPeerConnection.setRemoteDescription(answer);
      this.onSetSessionDescriptionSuccess();
    } catch (err) {
      this.onSetSessionDescriptionError(err);
    }
  };

  sendData = () => {
    if (this.sendChannel.readyState === 'open') {
      this.sendChannel.send(this.dataChannelCounter);
      console.log(`DataChannel send counter: ${this.dataChannelCounter}`);
      this.dataChannelCounter++;
    }
  };

  hangup = () => {
    this.remoteVideo.srcObject = null;
    console.log('Ending call');
    this.localStream.getTracks().forEach(track => track.stop());
    this.sendChannel.close();
    if (this.receiveChannel) this.receiveChannel.close();
    this.localPeerConnection.close();
    this.remotePeerConnection.close();
    this.localPeerConnection = null;
    this.remotePeerConnection = null;
  };

  gotRemoteStream = e => {
    console.log('gotRemoteStream "e": ', e); // ????????????????????

    if (this.remoteVideo.srcObject !== e.streams[0]) {
      this.remoteVideo.srcObject = e.streams[0];
      console.log('Received remote stream');
    }
  };

  getOtherPeerConnection = pc => {
    return pc === this.localPeerConnection
      ? this.remotePeerConnection
      : this.localPeerConnection;
  };

  getName = pc => {
    return pc === this.localPeerConnection
      ? 'localPeerConnection'
      : 'remotePeerConnection';
  };

  onIceCandidate = async (pc, event) => {
    try {
      await getOtherPeerConnection(pc).addIceCandidate(event.candidate);
      this.onAddIceCandidateSucces(pc);
    } catch (err) {
      this.onAddIceCandidateError(pc, err);
    }

    console.log(
      `${this.getName(pc)} ICE candidate:\n${
        event.candidate ? event.candidate.candidate : '(null)'
      }`
    );
  };

  onAddIceCandidateSuccess = () => {
    console.log('AddIceCandidate success.');
  };

  onAddIceCandidateError = error => {
    console.log('Failed to add Ice Candidate: ', error);
  };

  receiveChannelCallback = event => {
    console.log('Receive channel callback');
    this.receiveChannel = event.channel;
    this.receiveChannel.onmessage = this.onReceiveMessageCallback;
    this.receiveChannel.onopen = this.onReceiveChannelStateChange;
    this.receiveChannel.onclose = this.onReceiveChannelStateChange;
  };

  onReceiveMessageCallback = event => {
    this.dataChannelDataReceived = event.data;
    console.log(`DataChannel receive counter: ${this.dataChannelDataReceived}`);
  };

  onSendChannelStateChange = () => {
    const readyState = this.sendChannel.readyState;
    console.log(`Send channel state is: ${readyState}`);
    if (readyState === 'open') {
      this.sendDataLoop = setInterval(sendData, 1000);
    } else {
      clearInterval(this.sendDataLoop);
    }
  };

  onReceiveChannelStateChange = () => {
    const readyState = this.receiveChannel.readyState;
    console.log(`Receive channel state is: ${readyState}`);
  };




  render() {
    console.log('state', this.state)
    return (
      <Fragment>
        <MediaContainerNEW
          media={this.media}
          socket={this.socket}
          handleStateChange={this.handleStateChange}
          bridge={this.state.bridge}
        />
        <ControlContainerNEW
          media={this.media}
          socket={this.socket}
          handleStateChange={this.handleStateChange}
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
  // addRoom: (room, questionId, teacherId) =>
  //   dispatch(createClassroom(room, questionId, teacherId))
});

export default connect(mapState, mapDispatch)(ClassroomView);
