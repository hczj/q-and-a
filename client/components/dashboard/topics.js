import React from 'react';

const Topics = ({ topics, removeTopic }) => {
  if (!topics) return null;
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Current Topics</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>

      <div className="card-content">
        <div className="content">
          <div className="tags">
            {topics.length > 0 ? (
              topics.map(topic => (
                <span key={topic.id} className="tag is-rounded is-medium">
                  {topic.name}
                  <button
                    type="button"
                    className="delete is-small"
                    onClick={() => removeTopic(topic.id)}
                  />
                </span>
              ))
            ) : (
              <span>You currently have no topics!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;
