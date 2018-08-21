import React from 'react';
import { FeedbackRow } from '../../components';
import { Link } from "react-router-dom";

const Feedback = ({ feedback }) => {
  if (!feedback || feedback.length === 0) return null;
  return (
    <div className="card events-card">
      <header className="card-header">
        <p className="card-header-title">Feedback</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>
      <div className="card-table">
        <div className="content">
          <table className="table is-fullwidth is-striped">
            <tbody>
              {feedback.map(item => <FeedbackRow key={item.id} {...item} />)}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="card-footer">
        <Link to="/dashboard" className="card-footer-item">
          View All
        </Link>
      </footer>
    </div>
  );
};

export default Feedback;
