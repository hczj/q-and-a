import React, { Fragment } from 'react';
import { Question } from '../../components';
import { connect } from 'react-redux';

const Queue = ({ questions }) => {
  const activeQs = questions.filter(question => question.isActive);
  return (
    <Fragment>
      {activeQs.map(question => (
        <Question key={question.id} question={question} />
      ))}
    </Fragment>
  );
};

const mapState = state => ({
  questions: state.questions.all
});

export default connect(mapState)(Queue);
