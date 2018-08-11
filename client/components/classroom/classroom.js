import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Classroom = props => (
  <div className="hero">
    <div className="hero-body">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1 className="title">Classroom</h1>
            <p className="subtitle"><Link to="/">Go back to main app</Link></p>
            <div className="field">
              <label className="label">Room</label>
              <div className="control">
                <input
                  type="text"
                  name="room"
                  value={props.roomId}
                  onChange={props.handleChange}
                  required
                  autoFocus
                  placeholder="Enter the room ID..."
                  className="input"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <Link className="button is-primary" to={`classroom/r/${props.roomId}`}>
                  Join
                </Link>
              </div>
              <div className="control">
                <Link className="button" to={`classroom/r/${props.defaultRoomId}`}>
                  Random
                </Link>
              </div>
            </div>
            <div className="content">
              {props.rooms.length !== 0 && <div>Recently used rooms:</div>}
              <ul>
                {props.rooms.map(room => (
                  <li key={room}>
                    <Link className="recent-room" to={`classroom/r/${room}`}>
                      {room}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapState = state => ({ rooms: state.classrooms.all });

export default connect(mapState)(Classroom);
