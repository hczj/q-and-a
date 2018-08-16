import React from 'react';
import { connect } from 'react-redux';

const MessageList = ({ messages, myId }) => {
  //   console.log('isLoadingActive', isLoadingActive);
  //   console.log('thread', thread);

  return (
    <div className="box">
      {messages &&
        messages.map(message => {
          return (
            <div key={message.id}>
              <article
                className={`message ${
                  message.userId === myId ? 'is-primary' : 'is-dark'
                }`}
              >
                <div className="message-body">{message.content}</div>
              </article>
            </div>
          );
        })}
    </div>
  );
};

// const mapState = state => ({
//   isLoadingActive: state.threads.isLoadingActive,
//   thread: state.threads.active
// });

// export default connect(mapState)(MessageList);
export default MessageList;
