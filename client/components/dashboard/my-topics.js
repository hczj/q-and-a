import React from 'react';
import { Header, NothingHere } from '../../components';

const MyTopics = ({ topics }) => {
  if (!topics) return null;
  return (
    <div className="box">
      <Header title="Currently Learning" size="is-3" />
      <div className="tags">
        {topics.length &&
          topics.map(topic => (
            <span key={topic.id} className="tag is-rounded">
              {topic.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default MyTopics;
