import React from 'react';
import { Link } from 'react-router-dom';

const Classroom = ({ roomId }) => (
  <div className="hero">
    <div className="hero-body">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1 className="title">Classroom</h1>
            <p className="subtitle">
              <Link to="/">Go back to main app</Link>
            </p>
            <div className="field">
              <label className="label">Room</label>
              <div className="control">
                <input
                  type="text"
                  name="room"
                  value={roomId}
                  disabled
                  className="input"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <Link
                  className="button is-primary"
                  to={`classroom/r/${roomId}`}
                >
                  Join
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Classroom;
