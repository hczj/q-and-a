import React from 'react';
import { connect } from 'react-redux';
import { Header, NothingHere } from '../../components';

const MyTopics = ({ topics }) => {
  if (!topics) return null;
  return (
    <div className="box">
      <Header title="Currently Learning" />
      {topics.length ? (
        topics.map(topic => <h1 key={topic.id}>{topic.name}</h1>)
      ) : (
        <NothingHere />
      )}
    </div>
  );
};

const mapState = state => ({
  topics: state.me.topics
});

export default connect(mapState)(MyTopics);
