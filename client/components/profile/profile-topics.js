import React from 'react';
import { connect } from 'react-redux';

const ProfileTopics = ({ user }) => {
  if (!user.topics) return null;
  return (
    <div style={{ width: 400 }}>
      <div className="card">
        <div className="card-content">
          <p className="title is-4">Current Topics:</p>
          {user.topics.map(topic => (
            <p className="subtitle is-5" key={user.topic.id}>
              {user.topic.userTopic.proficiency} at {user.topic.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTopics;
