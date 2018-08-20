import React, { Fragment } from 'react';
import { Header, Question, AskQuestionButton } from '../../components';

const ActiveQuestions = ({ questions }) => {
  const activeQs = questions.filter(question => question.isActive);

  return (
    <div className="box">
      <Header title="Active Questions" size="is-3" />
      {activeQs.length === 0 ? (
        <Fragment>
          <AskQuestionButton />
        </Fragment>
      ) : (
        activeQs.map(question => (
          <Question key={question.id} question={question} answerBtn={false} />
        ))
      )}
    </div>
  );
};

export default ActiveQuestions;
