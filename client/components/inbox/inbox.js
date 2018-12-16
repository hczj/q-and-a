import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Threads, MessageList, MessageForm, User } from '../../components';

const Inbox = () => {
  const [thread, setThread] = useState({});
  const [threads, setThreads] = useState([]);

  const fetchThread = async threadId => {
    const { data } = await axios.get(`/api/threads/${threadId}`);
    setThread(data);
  };

  const fetchThreads = async () => {
    try {
      const { data } = await axios.get(`/api/threads/`);
      setThreads(data);

      if (!thread.id && data[0]) {
        fetchThread(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(
    () => {
      fetchThreads();
    },
    [thread]
  );

  const handleClick = (event, thread) => {
    [...document.querySelectorAll('.thread-list-item')].map(el => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      }
    });
    event.currentTarget.classList.add('is-active');
    fetchThread(thread.id);
  };

  const sendMessage = async message => {
    await axios.post(`/api/threads`, message);
    fetchThread(thread.id);
  };

  return (
    <User>
      {({ id: myId }) => (
        <div className="inbox">
          <div className="thread-list">
            <div className="thread-header">
              <span>Messages</span>
            </div>
            <Threads threads={threads} myId={myId} handleClick={handleClick} />
          </div>
          <div className="thread">
            {thread.id && <MessageList thread={thread} myId={myId} />}
            <MessageForm thread={thread} sendMessage={sendMessage} />
          </div>
        </div>
      )}
    </User>
  );
};

export default Inbox;
