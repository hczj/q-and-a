import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Peer from 'peerjs';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/theme/monokai.css';
import '../../../node_modules/codemirror/mode/javascript/javascript.js';
import socket from '../../socket';

const room = 'classroom';
const peer = new Peer({ key: 'lwjd5qra8257b9' });

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = { code: '//Hello World!' };
    socket.on('receive code', payload => {
      this.codeFromSocket(payload);
    });
  }

  codeFromSocket = text => {
    this.setState({ code: text });
  };

  componentDidMount() {
    socket.emit('room', room);
    peer.on('open', function(id) {
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

  onClick = () => {
    // const getVideo = (successCallback, errorCallback) => {
    //   navigator.getUserMedia(
    //     { audio: true, video: true },
    //     successCallback,
    //     errorCallback
    //   );
    // };
    this.selfVideo();
  };
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
        <button id="start-call" onClick={this.onClick}>
          start call
        </button>
        <video className="me-vid" autoPlay playsInline />
      </div>
    );
  }
}
