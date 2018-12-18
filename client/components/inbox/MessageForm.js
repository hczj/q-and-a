import React, { useEffect, useRef } from 'react';

const MessageForm = ({ thread, sendMessage }) => {
  const element = useRef(null);

  useEffect(() => {
    element.current.focus();
  });

  const handleMessageSubmit = data => {
    sendMessage({
      content: data,
      senderId: thread.senderId,
      receiverId: thread.receiverId,
      threadId: thread.id
    });
  };

  const submitOnEnter = event => {
    if (event.which === 13 && !event.shiftKey) {
      const message = event.target.value;
      if (/^\s*$/.test(message)) return; // no space, empty chars, line break
      handleMessageSubmit(message);
      event.target.value = '';
      event.preventDefault();
    }
  };

  return (
    <form className="thread-message-form" onSubmit={handleMessageSubmit}>
      <textarea
        ref={element}
        name="content"
        className="textarea"
        placeholder="Type a message..."
        spellCheck="true"
        rows={3}
        onKeyDown={submitOnEnter}
      />
    </form>
  );
};

export default MessageForm;
