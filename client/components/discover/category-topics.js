import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Header } from '../../components';

const CategoryTopics = ({ topics }) => (
  <Fragment>
    <Header title="Topics" />
    {topics.map(topic => <h1 key={topic.id}>{topic.name}</h1>)}
  </Fragment>
);

const mapState = state => ({
  topics: state.categories.active.topics
});

export default connect(mapState)(CategoryTopics);
