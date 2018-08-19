import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AnswerQuestionButton = ({ questionId, studentId, myId }) => (
  <Link
    className="button is-link"
    to={{
      pathname: '/classroom',
      // search: `?from=${xxxxxx}`,
      state: { questionId, studentId, teacherId: myId }
    }}
  >
    Answer
  </Link>
);

const mapState = state => ({ myId: state.me.id })

export default connect(mapState)(AnswerQuestionButton);
