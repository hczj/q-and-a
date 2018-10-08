import React from 'react';
import { FeedbackRow } from '../../components';
import { Link } from 'react-router-dom';

const Feedback = ({ feedback }) => (
  <div className="tile is-child box" style={{ padding: 0 }}>
    <div className="card" style={{ height: '100%' }}>
      <header className="card-header">
        <p className="card-header-title">Recent Feedback</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>
      <div className="card-content" style={{ flexGrow: 1 }}>
        {feedback.length > 0 ? (
          <table className="table is-fullwidth is-hoverable">
            <tbody>
              {feedback.map(item => <FeedbackRow key={item.id} {...item} />)}
            </tbody>
          </table>
        ) : (
          <div className="box">
            <p>You currently have no feedback from students!</p>
          </div>
        )}
      </div>
      <footer className="card-footer">
        {feedback.length > 0 ? (
          <Link to="/dashboard" className="card-footer-item is-small">
            View All
          </Link>
        ) : (
          <Link to="/questions" className="card-footer-item is-small">
            Answer A Question
          </Link>
        )}
      </footer>
    </div>
  </div>
);

export default Feedback;
