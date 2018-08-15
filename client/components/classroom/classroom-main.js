import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/theme/monokai.css';
import '../../../node_modules/codemirror/mode/javascript/javascript';
import '../../../node_modules/codemirror/mode/python/python';
import { SketchPicker } from 'react-color';

//import socket from '../../socket';
import io from 'socket.io-client';

let socket = io.connect();
const room = '';
export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.ctx = null;
    this.previousColor = '';
    this.mousePositionCurrent = [0, 0];
    this.mousePositionPrevious = [0, 0];
    this.lineStart = [0, 0];
    this.lineEnd = [0, 0];
    this.state = {
      code: '//Hello World!',
      color: 'black',
      lineWidth: 5,
      isDrawing: false,
      mode: 'javascript',
      eraserToggle: false,
      lineToggle: false
    };
  }

  componentDidMount() {
    socket.emit('find');
    socket.on('receive code', payload => {
      this.codeFromSocket(payload);
    });
    socket.on('receive drawing', (start, end, color, lineWidth) => {
      this.draw(start, end, color, lineWidth);
    });
    socket.on('receive clear', () => {
      this.clear();
    });

    this.canvas.addEventListener('mousedown', this.mouseDown);
    this.canvas.addEventListener('mousemove', this.mouseMove);
    this.canvas.addEventListener('mouseup', this.mouseUp);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 700, 700);
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

  draw = (start, end, color, lineWidth) => {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(...start);
    this.ctx.lineTo(...end);
    this.ctx.closePath();
    this.ctx.stroke();
    socket.emit('drawing event', start, end, color, lineWidth);
  };

  mouseDown = event => {
    this.setState({ isDrawing: true });
    this.mousePositionCurrent = [event.layerX, event.layerY];
    if (this.state.lineToggle) this.lineStart = [event.layerX, event.layerY];
  };

  mouseUp = event => {
    this.setState({ isDrawing: false });
    if (this.state.lineToggle) {
      this.lineEnd = [event.layerX, event.layerY];
      this.draw(
        this.lineStart,
        this.lineEnd,
        this.state.color,
        this.state.lineWidth
      );
    }
  };

  mouseMove = event => {
    if (this.state.isDrawing && !this.state.lineToggle) {
      this.mousePositionPrevious = this.mousePositionCurrent;
      this.mousePositionCurrent = [event.layerX, event.layerY];
      // this.mousePositionPrevious &&
      //   this.mousePositionCurrent &&
      this.draw(
        this.mousePositionPrevious,
        this.mousePositionCurrent,
        this.state.color,
        this.state.lineWidth
      );
    }
  };

  colorChange = color => {
    const converted = `rgba(${Object.values(color.rgb)})`;

    this.setState({ color: converted });
  };

  clear = () => {
    this.ctx.clearRect(0, 0, 700, 700);
    socket.emit('clear event');
  };

  changeMode = event => {
    this.setState({ mode: event.target.value });
  };

  changeBrushSize = event => {
    this.setState({ lineWidth: event.target.value });
  };

  toggleEraser = () => {
    if (this.state.color !== 'white') this.previousColor = this.state.color;
    this.state.eraserToggle
      ? this.setState({ color: this.previousColor })
      : this.setState({ color: 'white' });
    this.setState(prevState => {
      return {
        eraserToggle: !prevState.eraserToggle
      };
    });
  };

  toggleLine = () => {
    this.setState(prevState => {
      return {
        lineToggle: !prevState.lineToggle
      };
    });
  };

  render() {
    let options = {
      mode: this.state.mode,
      theme: 'monokai',
      lineNumbers: true
    };
    return (
      <div>
        <br />
        <div className="dropdown">
          <select onChange={this.changeMode}>
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <h3>
          Language:{' '}
          {this.state.mode.charAt(0).toUpperCase() + this.state.mode.slice(1)}
        </h3>
        <CodeMirror
          ref={code => (this.editor = code)}
          value={this.state.code}
          options={options}
          onChange={this.handleChangeCode.bind(this)}
        />
        <br />
        {/*make whiteboard component here*/}
        <canvas
          id="canvas"
          height="700"
          width="700"
          ref={thing => (this.canvas = thing)}
        />
        <SketchPicker
          color={this.state.color}
          onChangeComplete={this.colorChange}
        />
        <button onClick={this.clear}> Clear </button>
        <br />
        <form onSubmit={event => event.preventDefault()}>
          <label>
            Brush Size:
            <input
              type="number"
              name="lineWidth"
              value={this.state.lineWidth}
              onChange={this.changeBrushSize}
            />
          </label>
        </form>
        <button onClick={this.toggleEraser}>
          {this.state.eraserToggle ? 'Brush' : 'Eraser'}
        </button>
        <button onClick={this.toggleLine}>
          {this.state.lineToggle ? 'Brush' : 'Line'}
        </button>
        <br />
      </div>
    );
  }
}
