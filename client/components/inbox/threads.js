import React, { Fragment } from 'react';
import moment from 'moment';

const Threads = ({ threads, myId, handleClick }) => (
  <Fragment>
    {threads.map((thread, index) => {
      const { id, messages, receiver, sender, senderId } = thread;
      const notMe = senderId === myId ? receiver : sender;
      const lastMessage = messages[0];
      return (
        <div
          key={id}
          className={`thread-list-item ${index === 0 ? 'is-active' : ''}`}
          onClick={event => handleClick(event, thread)}
        >
          <figure className="thread-list-item-figure">
            <p className="image is-48x48">
              <img src={notMe.imageUrl} className="is-rounded" />
            </p>
          </figure>

          <div className="thread-list-item-details">
            <div className="thread-list-item-details-header">
              <p className="thread-list-item-name">{notMe.name}</p>
              <span className="thread-list-item-date">
                {moment(lastMessage.createdAt).fromNow()}
              </span>
            </div>
            <p className="thread-list-item-message">
              {`${lastMessage.userId === myId ? 'You: ' : ''} ${
                lastMessage.content
              }`}
            </p>
          </div>
        </div>
      );
    })}
  </Fragment>
);

export default Threads;
