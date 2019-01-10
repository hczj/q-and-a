import React from 'react';
import { Link } from 'react-router-dom';

const QuestionsOpen = () => (
  <Link to="/questions" className="tile is-child box">
    <p className="title">12</p>
    <p className="subtitle">Questions Open</p>
  </Link>
);

export default QuestionsOpen;
