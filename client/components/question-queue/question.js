import React from 'react';

const Question = ({ title, description, topics }) => {
  return (
    <div className="box">
      <h1 className="title is-4">{title}</h1>
      <div className="content">{description}</div>
      <div className="tags">
        {topics.map(topic => (
          <span key={topic.id} className="tag">
            {topic.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Question;
