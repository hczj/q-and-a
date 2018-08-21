import React, { Component } from 'react';
import Whiteboard from './whiteboard-container';
import Editor from './editor-container';
import { FeedbackForm } from '../../components';
import clientSocket from '../../socket';

class MediaContainer extends Component {
  state = {
    user: '',
    bridge: '',
    whiteboard: '',
    editor: '',
    feedback: ''
  };

  componentWillMount() {
    // chrome polyfill for connection between local device and remote peer
    window.RTCPeerConnection =
      window.RTCPeerConnection || window.webkitRTCPeerConnection;
    // set `media` to be the MediaContainer component
    this.props.media(this);
  }

  componentDidMount() {
    this.props.getUserMedia.then(
      stream => (this.localVideo.srcObject = this.localStream = stream)
    );

    clientSocket.on('rtc-bridge--from-server', role => {
      this.init();
    });

    clientSocket.on('create-room--from-server', room => {
      this.setState({ user: 'host', bridge: 'create' });
    });

    clientSocket.on('join-room--from-server', room => {
      this.setState({ user: 'guest', bridge: 'calling' });
    });

    clientSocket.on('room-is-full--from-server', () => {
      this.notifyClientRoomIsFull();
    });


      this.onMessage(message);
    });

    clientSocket.on('rtc-approve--from-server', ({ message, sid }) => {
      this.setState({ bridge: 'approve' });
    });

    clientSocket.on('rtc-hangup--from-server', () => {
      this.onRemoteHangup();
    });

    clientSocket.on('editor-toggle--from-server', () => {
      this.toggleEditor();
    });

    clientSocket.on('wb-toggle--from-server', () => {
      this.toggleWhiteboard();
    });
    clientSocket.on('wb-fullscreen--from-server', () => {
      this.toggleWhiteboardFullscreen();
    });
  }

  componentWillUnmount() {
    this.props.media(null);
    if (this.localStream !== undefined) {
      this.localStream.getVideoTracks()[0].stop();
    }
    this.props.mediaEvents.emit('leave');
  }

  onMessage = message => {
    if (!message) return;

    if (message.type === 'offer') {
      // set remote description and answer
      this.pc.setRemoteDescription(new RTCSessionDescription(message));
      this.pc
        .createAnswer()
        .then(this.setDescription)
        .then(this.sendDescription)
        .catch(this.handleError); // handle the failure to connect
    } else if (message.type === 'answer') {
      // set remote description
      this.pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate') {
      // add ice candidate
      this.pc.addIceCandidate(
        new RTCIceCandidate({
          sdpMLineIndex: message.mlineindex,
          candidate: message.candidate
        })
      );
    }
  };

  onRemoteHangup = () => {
    if (this.props.myId === this.props.classroom.student.id) {
      this.setState({ feedback: 'has-feedback-form' });
    }

    this.setState({ bridge: 'hangup' });
  };

  sendData = msg => this.dc.send(JSON.stringify(msg));

  // Set up the data channel message handler
  setupDataHandlers = () => {
    this.dc.onmessage = err => {
      const msg = JSON.parse(err.data);
      console.log('received message over data channel:' + msg);
    };
    this.dc.onclose = () => {
      this.remoteStream.getVideoTracks()[0].stop();
      console.log('The Data Channel is Closed');
    };
  };

  setDescription = offer => {
    this.pc.setLocalDescription(offer);
  };

  // send the offer to a server to be forwarded to the other peer
  sendDescription = () => {
    this.props.mediaEvents.emit('rtc-message', this.pc.localDescription);
  };

  hangup = () => {
    if (!this.pc) return;

    if (this.props.myId === this.props.classroom.student.id) {
      this.setState({ feedback: 'has-feedback-form' });
    }

    this.setState({ bridge: 'hangup' });
    this.pc.close();
    this.props.mediaEvents.emit('rtc-hangup');
  };

  handleError = err => console.log('error!', err);

  toggleEditor = () => {
    const hasEditor = !this.state.editor ? 'has-editor' : '';
    this.setState({ editor: hasEditor });
  };

  toggleWhiteboard = () => {
    const hasWhiteboard = !this.state.whiteboard ? 'has-whiteboard' : '';
    this.setState({ whiteboard: hasWhiteboard });
  };

  toggleWhiteboardFullscreen = () => {
    if (this.state.whiteboard === 'has-whiteboard') {
      this.setState({ whiteboard: 'has-whiteboard is-fullscreen' });
    } else {
      this.setState({ whiteboard: 'has-whiteboard' });
      console.log(this.state.whiteboard);
    }
  };

  notifyClientRoomIsFull = () => {
    this.setState({ bridge: 'full' });
  };

  init = () => {
    // wait for local media to be ready
    const attachMediaIfReady = () => {
      this.dc = this.pc.createDataChannel('chat');
      this.setupDataHandlers();
      console.log('attachMediaIfReady');
      this.pc
        .createOffer()
        .then(this.setDescription)
        .then(this.sendDescription)
        .catch(this.handleError); // handle the failure to connect
    };
    // set up the peer connection
    // this is one of Google's public STUN servers
    // make sure the offer/answer role does not change. If user A does a SLD
    // with type=offer initially, it must do that during the whole session
    this.pc = new RTCPeerConnection({
      iceServers: [{ url: 'stun:stun.l.google.com:19302' }]
    });
    // when our browser gets a candidate, send it to the peer
    this.pc.onicecandidate = event => {
      if (event.candidate) {
        console.log('*** ON ICE CANDIDATE EVENT', event);
        this.props.mediaEvents.emit('rtc-message', {
          type: 'candidate',
          mlineindex: event.candidate.sdpMLineIndex,
          candidate: event.candidate.candidate
        });
      }
    };
    // when the other side added a media stream, show it on screen
    this.pc.onaddstream = event => {
      this.remoteStream = event.stream;
      this.remoteVideo.srcObject = this.remoteStream = event.stream;
      this.setState({ bridge: 'established' });
    };
    this.pc.ondatachannel = event => {
      // data channel
      this.dc = event.channel;
      this.setupDataHandlers();
      this.sendData({
        peerMediaStream: {
          video: this.localStream.getVideoTracks()[0].enabled
        }
      });
    };
    // attach local media to the peer connection
    this.localStream
      .getTracks()
      .forEach(track => this.pc.addTrack(track, this.localStream));
    // call if we were the last to connect (to increase
    // chances that everything is set up properly at both ends)
    if (this.state.user === 'host') {
      this.props.getUserMedia.then(attachMediaIfReady);
    }
  };

  render() {
    const { user, bridge, whiteboard, editor, feedback } = this.state;
    return (
      <div
        className={`classroom-media ${user} ${bridge} ${whiteboard} ${editor} ${feedback}`}
      >
        <div className="video is-remote">
          <video
            id="#remote-video"
            ref={ref => (this.remoteVideo = ref)}
            autoPlay
          />
        </div>
        <div className="video is-local">
          <video
            id="#local-video"
            ref={ref => (this.localVideo = ref)}
            autoPlay
            muted
            draggable
          />
        </div>
        <Whiteboard
        // toggleWhiteboard={this.toggleWhiteboard}
        // socket={this.props.mediaEvents}
        />
        <Editor
        // toggleEditor={this.toggleEditor}
        // socket={this.props.mediaEvents}
        />
        <FeedbackForm />
      </div>
    );
  }
}

export default MediaContainer;
