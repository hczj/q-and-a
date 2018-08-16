import React, { Component } from 'react';
// import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/theme/textmate';
import 'brace/mode/text';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/mode/python';

const textMode = {
  mode: 'text',
  theme: 'textmate',
  highlightActiveLine: false,
  showGutter: false,
  showLineNumbers: false,
  showPrintMargin: false,
  fontSize: 18
};

const codeMode = {
  mode: 'javascript',
  theme: 'monokai',
  highlightActiveLine: true,
  showGutter: true,
  showLineNumbers: true,
  showPrintMargin: true,
  fontSize: 14
};

const modes = [
  { name: 'CSS', type: 'css' },
  { name: 'HTML', type: 'html' },
  { name: 'JavaScript', type: 'javascript' },
  { name: 'Python', type: 'python' }
];

export class EditorContainer extends Component {
  state = textMode;

  componentDidMount() {
    const { socket } = this.props;
    socket.on('editor-receive', payload => {
      this.setState({ value: payload });
    });
    socket.on('editor-mode', payload => {
      console.log('SOCKET EDITOR-MODE', payload)
      this.changeMode(payload);
    })
  }

  handleTextChange = text => {
    this.props.socket.emit('editor-event', text);
  };

  handleModeChange = event => {
    const mode = event.target.dataset.mode;
    this.props.socket.emit('editor-mode-event', mode);
    this.changeMode(mode);
  };

  changeMode = mode => {
    if (!mode) return;

    if (mode === 'text') {
      this.setState({ ...textMode, value: '' });
    } else {
      this.setState({ ...codeMode, mode, value: '' });
    }
  }

  handleDropdownClick = event => {
    // event.currentTarget.classList.toggle('is-active');
  };

  render() {
    return (
      <div className="editor">
        <div className="editor-menu level">
          <div className="level-left">
            <div className="level-item">
              <strong>Editor</strong>
            </div>
            <div className="level-item">
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button className="button">
                    <span>Syntax</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true" />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="editor-menu-syntax">
                  <div className="dropdown-content">
                    <a
                      className="dropdown-item"
                      data-mode="text"
                      onClick={this.handleModeChange}
                    >
                      Plain Text
                    </a>
                    <hr className="dropdown-divider" />
                    {modes.map(mode => (
                      <a
                        key={mode.type}
                        className="dropdown-item"
                        data-mode={mode.type}
                        onClick={this.handleModeChange}
                      >
                        {mode.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <a className="delete is-small" onClick={this.props.closeEditor} />
            </div>
          </div>
        </div>
        <AceEditor
          value={this.state.value}
          mode={this.state.mode}
          theme={this.state.theme}
          onChange={this.handleTextChange}
          name="ace-editor"
          width="100%"
          height="100%"
          editorProps={{ $blockScrolling: true }}
          fontSize={this.state.fontSize}
          highlightActiveLine={this.state.highlightActiveLine}
          showGutter={this.state.showGutter}
          showLineNumbers={this.state.showLineNumbers}
          showPrintMargin={this.state.showPrintMargin}
          tabSize={2}
          wrapEnabled={true}
        />
      </div>
    );
  }
}

export default EditorContainer;
