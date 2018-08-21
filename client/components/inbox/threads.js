import React, { Fragment } from 'react';
import moment from 'moment';

const Threads = ({ threads, myId, handleClick }) => {
  return (
    <Fragment>
      {threads.map((thread, i) => {
        const notMe =
          thread.senderId === myId ? thread.receiver : thread.sender;

        const lastMessage = thread.messages[0] || {userId: 0, content: '', createdAt: ''};

        return (
          <div
            key={thread.id}
            className={`thread-list-item ${i === 0 ? 'is-active' : ''}`}
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
                {`${lastMessage.userId === myId ? 'You: ' : ''} ${lastMessage.content}`}
              </p>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Threads;
