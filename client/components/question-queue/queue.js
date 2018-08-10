import React, { Fragment } from 'react';
import { Question } from '../../components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Queue = ({ questions }) => (
  <Fragment>
    <Link to="/ask-a-question">
      <button className="button is-link" type="button">
        Ask a question!
      </button>
    </Link>
    <div>
      {questions.map(question => <Question key={question.id} {...question} />)}
    </div>
  </Fragment>
);

const mapState = state => ({
  questions: state.questions.all
});

export default connect(mapState)(Queue);
