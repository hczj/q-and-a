import React from 'react';
import { Link } from 'react-router-dom';

const AnswerQuestionButton = () => (
  <Link to="/answer-question">
    <button className="button is-link">Answer</button>
  </Link>
);

export default AnswerQuestionButton;
