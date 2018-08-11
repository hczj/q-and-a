import React from 'react';
import { connect } from 'react-redux';
import { Header, QuestionCard } from '../../components';

const ActiveQuestions = ({ questions, myId }) => {
  const activeQs = questions.filter(
    question => question.userId === myId && question.isActive
  );

  if (activeQs.length === 0) return null;
  return (
    <div className="box">
      <Header title="Unanswered Questions" />
      <div className="columns">
        {activeQs.map(question => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </div>
  );
};

const mapState = state => ({
  myId: state.me.id,
  questions: state.questions.all
});

export default connect(mapState)(ActiveQuestions);
