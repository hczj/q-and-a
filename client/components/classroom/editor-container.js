import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/theme/textmate';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/plain_text';
import 'brace/mode/python';
import 'brace/mode/text';

const textMode = {
  mode: 'text',
  theme: 'textmate',
  highlightActiveLine: false,
  showGutter: false,
  showLineNumbers: false,
  showPrintMargin: false,
  fontSize: 16
}

const codeMode = {
  mode: 'javascript',
  theme: 'monokai',
  highlightActiveLine: true,
  showGutter: true,
  showLineNumbers: true,
  showPrintMargin: true,
  fontSize: 14
}

export class EditorContainer extends Component {
  state = textMode;

  componentDidMount() {
    this.props.socket.on('editor-receive', payload => {
      this.setState({ value: payload})
    });
  }

  handleTextChange = text => {
    this.props.socket.emit('editor-event', text);
  };

  handleModeChange = event => {
    const mode = event.target.value;
    if (!mode) return;

    if (mode === 'text') {
      this.setState(textMode)
    } else {
      this.setState({ ...codeMode, mode })
    }
  };

  render() {
    return (
      <div className="editor">
        <div className="file-menu">
          <div className="select">
            <select onChange={this.handleModeChange}>
              <option value="text">Plain text</option>
              <option value="javascript">JavaScript</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="python">Python</option>
            </select>
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
          editorProps={{$blockScrolling: true}}
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
