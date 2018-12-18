import React from 'react';
import { Router } from '@reach/router';
import QuestionQueue from './QuestionQueue';
import QuestionForm from './QuestionForm';
import QuestionView from './QuestionView';

const Questions = props => (
  <Router>
    <QuestionQueue path="/" />
    <QuestionForm path="add" />
    <QuestionView path="question/:questionId" />
  </Router>
);

export default Questions;
