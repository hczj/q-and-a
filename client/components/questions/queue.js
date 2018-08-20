import React, { Fragment } from 'react';
import { Question } from '../../components';
import { connect } from 'react-redux';

const Queue = ({ questions, isTeacher }) => {
  const activeQs = questions.filter(question => question.isActive);
  return (
    <Fragment>
      {activeQs.map(question => (
        <Question
          key={question.id}
          question={question}
          answerBtn
          isTeacher={isTeacher}
        />
      ))}
    </Fragment>
  );
};

const mapState = state => ({
  questions: state.questions.all,
  isTeacher: state.me.isTeacher
});

export default connect(mapState)(Queue);
