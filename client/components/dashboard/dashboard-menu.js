import React from 'react';
import { Link } from 'react-router-dom';

export default ({ isTeacher, handleClick }) => {
  return (
    <div className="tabs">
      <ul>
        <li data-target-tab="myTab" onClick={handleClick}>
          <Link to="/dashboard/profile">Profile</Link>
        </li>
        <li data-target-tab="myTab" onClick={handleClick}>
          <Link to="/dashboard/inbox">Inbox</Link>
        </li>
        <li data-target-tab="myTab" onClick={handleClick}>
          <Link to="/dashboard/topics">Topics</Link>
        </li>
        {isTeacher ? (
          <li data-target-tab="myTab" onClick={handleClick}>
            <Link to="/dashboard/feedback">Feedback</Link>
          </li>
        ) : (
          <li data-target-tab="myTab" onClick={handleClick}>
            <Link to="/dashboard/active-questions">Active Questions</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
