import React from 'react';

const Topics = ({ topics }) => {
  if (!topics) return null;
  return (
    <div className="box">
      <div className="content">
        <p>You have signed up to teach the following topics.</p>
        <div className="tags">
          {topics.length &&
            topics.map(topic => (
              <span key={topic.id} className="tag is-rounded">
                {topic.name}
              </span>
            ))}
        </div>
        <p>Add another topic:</p>
      </div>
    </div>
  );
};

export default Topics;
