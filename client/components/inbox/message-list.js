import React, { Fragment } from 'react';
import { linkify } from '../../utils';

const MessageList = ({ isLoading, thread, myId, notMe }) => (
  <Fragment>
    <div className="thread-header">
      <span>{notMe.name}</span>
    </div>
    <div className={`thread-message-list ${isLoading ? 'is-loading' : ''}`}>
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
  </Fragment>
);

export default MessageList;
