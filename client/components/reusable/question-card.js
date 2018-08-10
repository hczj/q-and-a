import React from 'react';

const QuestionCard = ({ title }) => {
  return (
    <div className="column">
      <h1 className="subtitle">{title}</h1>
    </div>
  );
};

export default QuestionCard;
