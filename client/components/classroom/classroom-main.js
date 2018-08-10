import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Peer from 'peerjs';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/theme/monokai.css';
import '../../../node_modules/codemirror/mode/javascript/javascript.js';
import socket from '../../socket';
import SimpleWebRTC from 'simplewebrtc';

const room = 'classroom';
const peer = new Peer({ key: 'lwjd5qra8257b9' });

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = { code: '//Hello World!', peerUserId: '' };
    socket.on('receive code', payload => {
      this.codeFromSocket(payload);
    });
  }

  codeFromSocket = text => {
    this.setState({ code: text });
  };

  async componentDidMount() {
    socket.emit('room', room);
    let peerUserId;
    const peerUser = await peer.on('open', function(id) {
      console.log('peer id is: ' + id);
    });

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
  }

  handleChangeCode = code => {
    socket.emit('coding event', {
      room: room,
      newCode: code.getValue()
    });
  };

  getMedia(opts, suc, err) {
    navigator.getUserMedia(opts, suc, err);
  }

  selfVideo() {
    this.getMedia(
      { audio: false, video: true },
      stream => {
        const video = document.querySelector('.me-vid');
        // @ts-ignore
        video.srcObject = stream;
      },
      err => console.log(err)
    );
  }

  onHaha = () => {
    const webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access
      autoRequestMedia: true
    });
    webrtc.on('readyToCall', function() {
      // you can name it anything
      webrtc.joinRoom('room');
    });
  };

  onClick = () => {
    console.log(this.state);
    // const getVideo = (successCallback, errorCallback) => {
    //   navigator.getUserMedia(
    //     { audio: true, video: true },
    //     successCallback,
    //     errorCallback
    //   );
    // };
    //this.selfVideo();
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    navigator.getUserMedia(
      { video: true, audio: true },
      function(stream) {
        var call = peer.call(this.state.peerUserId, stream);
        call.on('stream', function(remoteStream) {
          // Show stream in some <video> element.
          const video = document.querySelector('.me-vid');
          // @ts-ignore
          video.srcObject = remoteStream;
        });
      },
      function(err) {
        console.log('Failed to get local stream', err);
      }
    );
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    peer.on('call', function(call) {
      getUserMedia(
        { video: true, audio: true },
        function(stream) {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream', function(remoteStream) {
            // Show stream in some video/canvas element.
            const video = document.querySelector('.me-vid');
            // @ts-ignore
            video.srcObject = remoteStream;
          });
        },
        function(err) {
          console.log('Failed to get local stream', err);
        }
      );
    });
  };

  // onCall = id => {
  //   navigator.getUserMedia =
  //     navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia;
  //   navigator.getUserMedia(
  //     { video: true, audio: true },
  //     function(stream) {
  //       var call = peer.call(id, stream);
  //       call.on('stream', function(remoteStream) {
  //         // Show stream in some <video> element.
  //       });
  //     },
  //     function(err) {
  //       console.log('Failed to get local stream', err);
  //     }
  //   );
  // };

  render() {
    return (
      <div>
        <br />
        <CodeMirror
          value={this.state.code}
          options={{
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true
          }}
          onChange={this.handleChangeCode.bind(this)}
        />
        <button id="start-call" onClick={this.onHaha}>
          start call
        </button>

        <video id="localVideo" />
        <div id="remoteVideos" />
        <video className="me-vid" autoPlay playsInline />
        <video className="their-vid" autoPlay playsInline />
      </div>
    );
  }
}
