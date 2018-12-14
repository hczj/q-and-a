import React, { Fragment } from 'react';
import { linkify } from '../../utils';

const MessageList = ({ thread, myId }) => {
  const { messages, receiver, sender, senderId } = thread;
  const notMe = senderId === myId ? receiver : sender;

  return (
    <Fragment>
      <div className="thread-header">
        <span>{notMe.name}</span>
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
