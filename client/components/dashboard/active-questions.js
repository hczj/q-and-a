import React from 'react';
import { connect } from 'react-redux';
import { Header, QuestionCard } from '../../components';

const ActiveQuestions = ({ questions }) => {
  return (
    <div className="box">
      <Header title="Unanswered Questions" />

      <div className="columns">
        {questions.map(question => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </div>
  );
};

const mapState = state => ({
  questions: state.questions.all
});

export default connect(mapState)(ActiveQuestions);
