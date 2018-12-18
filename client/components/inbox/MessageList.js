import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import { linkify } from '../../utils';

const MessageList = ({ thread, myId }) => {
  const { messages, receiver, sender, senderId } = thread;
  const notMe = senderId === myId ? receiver : sender;

  return (
    <Fragment>
      <div className="thread-header">
        <Link to={`/profile/${notMe.id}`}>{notMe.name}</Link>
      </div>
      <div className="thread-message-list">
        {messages &&
          messages.map(message => (
            <div
              key={message.id}
              className={`message is-${
                message.userId === myId ? 'primary' : 'secondary'
              }`}
            >
              <div
                className="message-body"
                dangerouslySetInnerHTML={{ __html: linkify(message.content) }}
              />
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default MessageList;
