import React from 'react';
import { TopicsForm } from '../../components';
import { arrayToSentence } from '../../utils';

const Topics = ({
  topics,
  isTeacher,
  removeTopic,
  organization,
  categories
}) => {
  if (!topics || !categories) return null;
  let categoryNames = arrayToSentence(
    categories.map(category => category.name)
  );

  return (
    <div className="box">
      <div className="content">
        <p>
          {organization.name} has preselected {categoryNames} as categories for
          your organization.
        </p>
        {isTeacher ? (
          <p>
            You are currently registered to answer questions for the following
            topics:
          </p>
        ) : (
          <p>You are currently learning the following topics:</p>
        )}
        <div className="tags">
          {topics.length &&
            topics.map(topic => (
              <span key={topic.id} className="tag is-rounded is-large">
                {topic.name}
                <button
                  type="button"
                  className="delete is-small"
                  onClick={() => removeTopic(topic.id)}
                />
              </span>
            ))}
        </div>
        <p>
          Click the x to remove a topic. If you'd like to add another topic, you
          may do so below.
        </p>
        <TopicsForm />
      </div>
    </div>
  );
};

export default Topics;
