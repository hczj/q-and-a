import React from 'react';
import { connect } from 'react-redux';

const MessageList = ({ thread, myId }) => {
  console.log('Messages is: ', thread);
  return (
    <div className="">
      <div className="box">
        MESSAGE LIST
      </div>
      {thread.messages &&
        thread.messages.map(message => (
          <article
            key={message.id}
            className={`message is-${
              message.userId === myId ? 'primary' : 'dark'
            }`}
          >
            <div className="message-body">{message.content}</div>
          </article>
        ))}
    </div>
  );
};

export default MessageList;
