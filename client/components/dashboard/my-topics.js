import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../../components';

const MyTopics = ({ topics, isLoading }) => {
  if (isLoading) return null;
  return (
    <div className="box">
      <Header title="Currently Learning" />
      {topics.map(topic => <h1 key={topic.id}>{topic.name}</h1>)}
    </div>
  );
};

const mapState = state => ({
  topics: state.me.topics,
  isLoading: state.categories.isLoading
});

export default connect(mapState)(MyTopics);
