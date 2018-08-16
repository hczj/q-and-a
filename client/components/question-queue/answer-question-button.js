import React from 'react';
import { Link } from 'react-router-dom';

const AnswerQuestionButton = () => (
  <Link to="/answer-question">
    <a className="button is-link">Answer</a>
  </Link>
);

export default AnswerQuestionButton;
