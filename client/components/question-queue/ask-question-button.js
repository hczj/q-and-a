import React from 'react';
import { Link } from 'react-router-dom';

const AskQuestionButton = () => (
  <Link to="/ask-a-question">
    <button className="button is-link" type="button">
      Ask a question!
    </button>
  </Link>
);

export default AskQuestionButton;
