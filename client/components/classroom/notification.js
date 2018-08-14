import React from 'react';
import { Link } from 'react-router-dom';

const Notification = props => (
  <div className="classroom-notification">

      <div className="notification content">
        <div className="request-access">
          <p>Begin your call</p>
          <form onSubmit={props.send}>
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary">Start</button>
              </p>
            </div>
          </form>
        </div>

        <div className="grant-access">
          <p>NAME NAME wants to join your call</p>
          <div className="field is-grouped">
            <p className="control">
              <button
                onClick={props.handleInvitation}
                data-ref="accept"
                className="button is-primary"
              >
                Accept
              </button>
            </p>
            <p className="control">
              <button
                onClick={props.handleInvitation}
                data-ref="reject"
                className="button is-outlined"
              >
                Reject
              </button>
            </p>
          </div>
        </div>

        <div className="room-full">
          <p>This classroom is unavailable.</p>
          <Link className="button is-primary" to="/classroom">
            Go back
          </Link>
        </div>

        <div className="waiting">
          <p>Waiting for someone to join the classroom: <a href={window.location.href}>{window.location.href}</a>.</p>
          <p className="remote-left">The remote client hung up.</p>
        </div>
      </div>

  </div>
)

export default Notification;
