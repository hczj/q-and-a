import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

const TopicsInput = ({ topics }) => {
  if (!topics) return null;
  return (
    <Fragment>
      {topics.map(topic => (
        <div className="field" key={topic.id}>
          <Field component="input" name={`topic.${topic.id}`} type="checkbox" />
          <label>{topic.name}</label>
        </div>
      ))}
    </Fragment>
  );
};

const mapState = state => ({
  topics: state.categories.active.topics
});

export default connect(mapState)(TopicsInput);
