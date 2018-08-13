import React from 'react';

const Question = ({ title, description }) => {
  return (
    <div className="box">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Question;
