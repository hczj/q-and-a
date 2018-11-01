import React from 'react';
import ToggleFullScreen from './toggle-full-screen';
import {
  IconExit,
  IconAudio,
  IconVideo,
  IconFullScreen,
  IconHangup
} from './icons';

const Toolbar = props => (
  <div className="classroom-toolbar">
    <div className="classroom-status">
      <span className="icon">
        <i className="fas fa-circle" />
      </span>
      <span className="text in-progress">Call in Progress</span>
    </div>
    <div className="media-controls">
      <button
        type="button"
        onClick={props.toggleAudio}
        className={`button button-audio is-${props.audio}`}
      >
        <IconAudio />
      </button>
      <button
        type="button"
        onClick={props.toggleVideo}
        className={`button button-video is-${props.video}`}
      >
        <IconVideo />
      </button>
      <button
        type="button"
        onClick={props.handleHangup}
        className="button button-hangup"
      >
        <IconHangup />
      </button>
      <button
        type="button"
        onClick={ToggleFullScreen}
        className="button button-fullscreen"
      >
        <IconFullScreen />
      </button>
    </div>
    <div className="classroom-chat">CHAT</div>
  </div>
);

export default Toolbar;
