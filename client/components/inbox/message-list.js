import React from 'react';
import { connect } from 'react-redux';

const MessageList = ({ messages, myId }) => (
  <div className="box">
    {messages &&
      messages.map(message => (
        <article
          key={message.id}
          className={`message is-${message.userId === myId ? 'primary' : 'dark'}`}
        >
          <div className="message-body">{message.content}</div>
        </article>
      ))}
  </div>
);

export default MessageList;
