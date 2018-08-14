import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="media-controls">
      <button onClick={props.handleExit} className="button button-exit">
        <IconExit />
      </button>
      <button onClick={props.handleHangup} className="button button-hangup">
        <IconHangup />
      </button>
      <button
        onClick={props.toggleAudio}
        className={`button button-audio is-${props.audio}`}
      >
        <IconAudio />
      </button>
      <button
        onClick={props.toggleVideo}
        className={`button button-video is-${props.video}`}
      >
        <IconVideo />
      </button>
      <button onClick={ToggleFullScreen} className="button button-fullscreen">
        <IconFullScreen />
      </button>
    </div>
  </div>
);

export default Toolbar;
