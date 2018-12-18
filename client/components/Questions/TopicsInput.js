import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

const TopicsInput = ({ topics }) => {
  if (!topics) return null;
  return (
    <div className="field">
      {topics.map(topic => (
        <div
          className="pretty p-default p-curve p-fill p-bigger"
          key={topic.id}
        >
          <Field component="input" name={`topic.${topic.id}`} type="checkbox" />
          <div className="state">
            <label> {topic.name}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapState = state => ({
  topics: state.categories.active.topics
});

export default connect(mapState)(TopicsInput);
