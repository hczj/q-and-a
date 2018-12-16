import React from 'react';

const ProfileTopics = ({ topics }) => {
  return (
    <div style={{ width: 400 }}>
      <div className="card">
        <div className="card-content">
          <p className="title is-4">Current Topics:</p>
          {topics.map(topic => (
            <p className="subtitle is-5" key={topic.id}>
              {topic.userTopic.proficiency} at {topic.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTopics;
