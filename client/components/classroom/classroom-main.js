import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/theme/monokai.css';
import '../../../node_modules/codemirror/mode/javascript/javascript.js';
import CanvasDraw from 'react-canvas-draw';

import socket from '../../socket';

const room = 'classroom';
export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '//Hello World!',
      color: 'black',
      clearCanvas: false
    };
    socket.on('receive code', payload => {
      this.codeFromSocket(payload);
    });
  }
  componentDidMount() {
    socket.emit('room', room);
  }

  codeFromSocket = text => {
    this.setState({ code: text });
  };

  handleChangeCode = code => {
    socket.emit('coding event', {
      room: room,
      newCode: code.getValue()
    });
  };

  changeRed = () => {
    this.setState({ color: 'red' });
  };

  changeYellow = () => {
    this.setState({ color: 'yellow' });
  };

  changeBlack = () => {
    this.setState({ color: 'black' });
  };

  changeBlue = () => {
    this.setState({ color: 'blue' });
  };

  clearCanvas = () => {
    this.setState({ clearCanvas: true });
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
        <br />
        {<CanvasDraw brushColor={this.state.color} />}
        <button type="button" onClick={this.changeYellow}>
          Yellow
        </button>
        <button type="button" onClick={this.changeRed}>
          Red
        </button>
        <button type="button" onClick={this.changeBlack}>
          Black
        </button>
        <button type="button" onClick={this.changeBlue}>
          Blue
        </button>
        <button type="button" onClick={this.clearCanvas}>
          Clear
        </button>
      </div>
    );
  }
}
