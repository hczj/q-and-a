import React from 'react';
import { Header, QuestionCard } from '../../components';

export default ({ questions, myId }) => {
  const activeQs = questions.filter(
    question => question.userId === myId && question.isActive
  );

  if (activeQs.length === 0) return null;
  return (
    <div className="box">
      <Header title="Active Questions" size="is-3" />
      <div className="columns">
        {activeQs.map(question => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </div>
  );
};
