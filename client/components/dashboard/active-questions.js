import React from 'react';
import { Header, Question } from '../../components';

const ActiveQuestions = ({ questions }) => {
  const activeQs = questions.filter(question => question.isActive);

  if (activeQs.length === 0) return null;
  return (
    <div className="box">
      <Header title="Active Questions" size="is-3" />
      {activeQs.map(question => (
        <Question key={question.id} question={question} answerBtn={false} />
      ))}
    </div>
  );
};

export default ActiveQuestions;
