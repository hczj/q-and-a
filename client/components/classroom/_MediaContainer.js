import React, { Component } from 'react';
import clientSocket from '../../socket';

class MediaContainerNEW extends Component {

  componentDidMount() {
    clientSocket.on('message', this.onMessage);
    clientSocket.on('hangup', this.onRemoteHangup);
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className={`classroom-media ${this.props.bridge}`}>
        <video
          id="is-remote"
          className="video is-remote"
          autoPlay
        />
        <video
          id="is-local"
          className="video is-local"
          autoPlay
          muted
          draggable
        />
      </div>
    );
  }
}

export default MediaContainerNEW;
