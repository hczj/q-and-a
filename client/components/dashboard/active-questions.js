import React, { Fragment } from 'react';
import { Header, Question, Button } from '../../components';

const ActiveQuestions = ({ questions }) => {
  return (
    <div className="box">
      <Header title="Active Questions" size="is-3" />
      {questions.length === 0 ? (
        <Fragment>
          <Button
            link="/classroom"
            text="Ask a question!"
            classes="button is-link"
          />
        </Fragment>
      ) : (
        questions.map(question => (
          <Question key={question.id} question={question} />
        ))
      )}
    </div>
  );
};

export default ActiveQuestions;
