import React, { Fragment } from 'react';
import { Header, Question, Button } from '../../components';

const ActiveQuestions = ({ questions }) => {
  const activeQs = questions.filter(question => question.isActive);

  return (
    <div className="box">
      <Header title="Active Questions" size="is-3" />
      {activeQs.length === 0 ? (
        <Fragment>
          <Button
            link="/classroom"
            text="Ask a question!"
            classes="button is-link"
          />
        </Fragment>
      ) : (
        activeQs.map(question => (
          <Question key={question.id} question={question} />
        ))
      )}
    </div>
  );
};

export default ActiveQuestions;
