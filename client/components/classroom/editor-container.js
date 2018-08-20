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
import clientSocket from '../../socket';
import { EventEmitter } from 'events';
export const editorEvents = new EventEmitter();

const textMode = {
  mode: 'text',
  name: 'Plain Text',
  theme: 'textmate',
  highlightActiveLine: false,
  showGutter: false,
  showLineNumbers: false,
  showPrintMargin: false,
  fontSize: 18
};

const codeMode = {
  mode: 'javascript',
  name: 'JavaScript',
  theme: 'textmate',
  highlightActiveLine: false,
  showGutter: true,
  showLineNumbers: true,
  showPrintMargin: false,
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
    clientSocket.on('editor-content--from-server', content => {
      this.setState({ value: content });
    });

    clientSocket.on('editor-mode--from-server', mode => {
      this.changeMode(mode);
    })
  }

  handleContentChange = content => {
    editorEvents.emit('editor-content', content);
  };

  handleModeChange = event => {
    [...document.querySelectorAll('#menu-syntax .dropdown-item')].map(el => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      }
    });
    event.target.classList.add('is-active');
    const mode = event.target.dataset.mode;
    const name = event.target.dataset.name;
    editorEvents.emit('editor-mode', mode);
    this.changeMode(mode, name);
  };

  changeMode = (mode, name) => {
    if (!mode) return;

    if (mode === 'text') {
      this.setState({ ...textMode, name, value: '' });
    } else {
      this.setState({ ...codeMode, mode, name });
    }
  }

  handleDropdownClick = event => {
    // event.currentTarget.classList.toggle('is-active');
  };

  render() {
    return (
      <div className="editor">
        <div className="file-menu">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <strong>Editor</strong>
              </div>
              <div className="level-item">
                <div className="dropdown is-hoverable">
                  <div className="dropdown-trigger">
                    <button className="button">
                      <span>Syntax: {this.state.name}</span>
                      <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="menu-syntax">
                    <div className="dropdown-content">
                      <a
                        className="dropdown-item is-active"
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
                          data-name={mode.name}
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
        </div>
        <AceEditor
          value={this.state.value}
          mode={this.state.mode}
          theme={this.state.theme}
          onChange={this.handleContentChange}
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
