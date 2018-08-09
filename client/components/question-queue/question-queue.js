import React, { Fragment } from 'react';
import { Queue, Header } from '../../components';

const QuestionQueue = () => {
  return (
    <Fragment>
      <Header title="Question Queue" />
      <Queue />
    </Fragment>
  );
};

export default QuestionQueue;
