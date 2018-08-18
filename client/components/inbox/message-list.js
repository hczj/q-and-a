import React from 'react';
import { connect } from 'react-redux';

const MessageList = ({ thread, myId }) => (
  <div className="thread-message-list">
    {thread.messages &&
      thread.messages.map(message => (
        <div
          key={message.id}
          className={`message is-${
            message.userId === myId ? 'primary' : 'secondary'
          }`}
        >
          <div className="message-body">{message.content}</div>
        </div>
      ))}
  </div>
);

export default MessageList;
