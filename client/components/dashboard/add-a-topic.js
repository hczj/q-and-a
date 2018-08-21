import React from 'react';
import { TopicsForm } from '../../components';

const AddATopic = ({ topics }) => {
  if (topics.length === 0) return null;
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Add Topics</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>

      <div className="card-content">
        <div className="content">
          <TopicsForm />
        </div>
      </div>
    </div>
  );
};

export default AddATopic;
