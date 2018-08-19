import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
import { EventEmitter } from 'events';
export const whiteboardEvent = new EventEmitter();
import socket from '../../socket';

export class WhiteboardContainer extends Component {
  state = {
    color: 'black',
    lineWidth: 2,
    isDrawing: false,
    eraserToggle: false,
    lineToggle: false
  };

  canvas = null;
  ctx = null;
  previousColor = '';
  mousePositionCurrent = [0, 0];
  mousePositionPrevious = [0, 0];
  lineStart = [0, 0];
  lineEnd = [0, 0];

  componentDidMount() {
    // const { socket } = this.props:
    socket.on('wb-draw', (start, end, color, lineWidth) => {
      console.log('draw from server');
      this.draw(start, end, color, lineWidth);
    });
    socket.on('wb-clear', () => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    });

    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousedown', this.mouseDown);
    this.canvas.addEventListener('mousemove', this.mouseMove);
    this.canvas.addEventListener('mouseup', this.mouseUp);
  }

  draw = (start, end, color, lineWidth) => {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(...start);
    this.ctx.lineTo(...end);
    this.ctx.closePath();
    this.ctx.stroke();
    whiteboardEvent.emit('wb-draw-event', start, end, color, lineWidth);
  };

  mouseDown = event => {
    this.setState({ isDrawing: true });
    this.mousePositionCurrent = this.getMousePos(this.canvas, event);

    if (this.state.lineToggle)
      this.lineStart = this.getMousePos(this.canvas, event);
  };

  getMousePos(canvas, event) {
    let rect = this.canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;

    return [
      (event.clientX - rect.left) * scaleX,
      (event.clientY - rect.top) * scaleY
    ];
  }

  mouseUp = event => {
    this.setState({ isDrawing: false });
    if (this.state.lineToggle) {
      this.lineEnd = this.getMousePos(this.canvas, event);
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
      this.mousePositionCurrent = this.getMousePos(this.canvas, event);
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
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    whiteboardEvent.emit('wb-clear-event');
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
    let pathname = window.location.pathname;
    whiteboardEvent.emit(
      'join-room-whiteboard',
      pathname.slice(12, pathname.length)
    );
    return (
      <div className="whiteboard">
        <div className="file-menu">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <strong>Whiteboard</strong>
              </div>
              <div className="level-item">
                <div className="dropdown is-hoverable">
                  <div className="dropdown-trigger">
                    <button className="button">
                      <span>Settings</span>
                      <span className="icon is-small">
                        <i className="fas fa-cog" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="menu-settings">
                    <div className="dropdown-content">
                      <TwitterPicker
                        color={this.state.color}
                        onChangeComplete={this.colorChange}
                        triangle="hide"
                        width="100%"
                      />

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

                      <button className="button" onClick={this.toggleEraser}>
                        {this.state.eraserToggle ? 'Brush' : 'Eraser'}
                      </button>
                      <button className="button" onClick={this.toggleLine}>
                        {this.state.lineToggle ? 'Brush' : 'Line'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button
                  className="button is-small is-primary"
                  onClick={this.clear}
                >
                  Clear
                </button>
              </div>
              <div className="level-item">
                <a
                  className="delete is-small"
                  onClick={this.props.closeWhiteboard}
                />
              </div>
            </div>
          </div>
        </div>
        <canvas id="canvas" ref={canvas => (this.canvas = canvas)} />
      </div>
    );
  }
}

export default WhiteboardContainer;
