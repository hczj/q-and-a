import React from 'react';

const UpvoteButton = ({ upVote, question }) => (
  <span className="icon" onClick={() => upVote(question)}>
    <i className="fas fa-caret-up button is-light" />
  </span>
);

export default UpvoteButton;
