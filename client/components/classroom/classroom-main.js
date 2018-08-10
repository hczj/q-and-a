import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/theme/monokai.css';
import '../../../node_modules/codemirror/mode/javascript/javascript.js';
import socket from '../../socket';
import DrawableCanvas from 'react-drawable-canvas';

const room = 'classroom';
export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '//Hello World!',
      peerUserId: '',

      brushColor: '#800909',
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#00FFDC'
      },
      clear: false
    };
    socket.on('receive code', payload => {
      this.codeFromSocket(payload);
    });
  }

  codeFromSocket = text => {
    this.setState({ code: text });
  };

  componentDidMount() {
    socket.emit('room', room);
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

  handleOnClickClear() {
    this.setState({
      clear: true
    });
  }

  handleOnClickChangeColorYellow() {
    // this.setState({
    //   brushColor: '#ffff00',
    //   clear: false
    // });
    console.log(this.state);
  }

  handleOnClickChangeColorRed() {
    this.setState({
      brushColor: '#800909',
      clear: false
    });
  }

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
        <br />
        <DrawableCanvas {...this.state} />
        <button onClick={this.handleOnClickClear}>Clear all</button>
        <button onClick={this.handleOnClickChangeColorYellow}>
          Set color to Yellow
        </button>
        <button onClick={this.handleOnClickChangeColorRed}>
          Set color to Red
        </button>
      </div>
    );
  }
}
