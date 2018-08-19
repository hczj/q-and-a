import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Notification = props => (
  <div className="classroom-notification">

      <div className="notification content" id="request-access">
        <p className="title is-4">New call</p>
        <p>You have been invited to join someone's classroom.</p>
        <form onSubmit={props.send}>
          <div className="field is-grouped">
            <p className="control">
              <button className="button is-primary">Start</button>
            </p>
          </div>
        </form>
      </div>

      <div className="notification content" id="grant-access">
        <p className="title is-4">Incoming request</p>
        <p>Someone wants to join your classroom.</p>
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

      <div className="notification content" id="room-full">
        <p className="title is-4">Whoops!</p>
        <p>This classroom is unavailable.</p>
        <Link className="button is-primary" to="/classroom">
          Go back
        </Link>
      </div>

      <div className="notification content" id="waiting">
        <p className="remote-left">The remote client hung up.</p>
        <p className="title is-4">New classroom</p>
        <p>Waiting for someone to join you.</p>
        <p className="is-size-7"><a href={`/classroom/r/${props.room}`}>{window.location.href}</a></p>
      </div>

  </div>
)

const mapState = state => ({
  room: state.classroom.room,
  student: state.users.active
})

export default connect(mapState)(Notification);
