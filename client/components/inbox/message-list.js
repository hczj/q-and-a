import React from 'react';
import { connect } from 'react-redux';
import { linkify } from '../../utils';

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
          <div
            className="message-body"
            dangerouslySetInnerHTML={{ __html: linkify(message.content) }}
          />
        </div>
      ))}
  </div>
);

export default MessageList;