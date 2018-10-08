import React, { Fragment } from 'react';
import { Question } from '../../components';
import { connect } from 'react-redux';

const Queue = ({ questions, isTeacher, closeQuestion, myId }) => (
  <Fragment>
    {questions.map(question => (
      <Question
        key={question.id}
        question={question}
        isTeacher={isTeacher}
        closeQuestion={closeQuestion}
        myId={myId}
      />
    ))}
  </Fragment>
);

const mapState = state => ({
  questions: state.questions.all,
  isTeacher: state.me.isTeacher,
  myId: state.me.id
});

export default connect(mapState)(Queue);
