import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Notification = props => {
  if (!props.student) return null;
  return (
    <div className="classroom-notification">
      <div className="notification" id="waiting">
        <p className="title is-3">New classroom</p>
        <p className="subtitle is-5">Waiting for {props.student.firstName} to join</p>
        <figure className="contact-image image is-128x128">
          <img src={props.student.imageUrl} className="is-rounded" />
        </figure>
        <p className="contact-name">{props.student.name}</p>
        <p className="contact-question">"{props.question.title}"</p>
      </div>

      <div className="notification content" id="call-start">
        <p className="title is-3">New classroom</p>
        <p className="subtitle is-5">You have been invited to a classroom session with {props.teacher.name}. Click start to begin the call.</p>
        <div className="buttons">
          <a onClick={props.startCall} className="button is-primary">Start</a>
          <button onClick={event => props.goBack(event)} className="button is-light">Cancel</button>
        </div>
      </div>

      <div className="notification content" id="call-end">
        <p className="title is-3">End of session</p>
        <p className="subtitle is-5">Your call with {props.student.firstName} has ended</p>
        <div className="buttons">
          <button onClick={event => props.handleExit(event)} className="button is-primary">Exit Room</button>
        </div>
      </div>

      <div className="notification content" id="grant-access">
        <p className="title is-3">Incoming request</p>
        <p className="subtitle is-5">{props.student.firstName} is calling you</p>
        <div className="field is-grouped">
          <p className="control">
            <button
              onClick={props.handleInvitation}
              data-ref="rtc-accept"
              className="button is-primary"
            >
              Accept
            </button>
          </p>
          <p className="control">
            <button
              onClick={props.handleInvitation}
              data-ref="rtc-reject"
              className="button is-outlined"
            >
              Reject
            </button>
          </p>
        </div>
      </div>

      <div className="notification content" id="room-full">
        <p className="title is-3">We're sorry</p>
        <p className="subtitle is-5">This classroom is unavailable.</p>
        <div className="buttons">
          <button onClick={event => props.goBack(event)} className="button is-primary">Go Back</button>
        </div>
      </div>
    </div>
  );
};

const mapState = state => ({
  room: state.classroom.room,
  question: state.classroom.question,
  student: state.classroom.student,
  teacher: state.classroom.teacher
});

export default connect(mapState)(Notification);
