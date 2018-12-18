import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import Threads from './Threads';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { useMe } from '../../hooks';
import { MeContext } from '../../context';

const initialState = {
  threads: [],
  thread: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_THREADS':
      return {
        ...state,
        threads: action.threads
      };

    case 'RECEIVE_THREAD':
      return {
        ...state,
        thread: action.thread
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        thread: {
          ...state.thread,
          messages: [...state.thread.messages, action.message]
        }
      };

    default:
      return state;
  }
};

const Inbox = () => {
  const me = useContext(MeContext);
  const [{ threads, thread }, dispatch] = useReducer(reducer, initialState);

  const fetchThread = async threadId => {
    const { data } = await axios.get(`/api/threads/${threadId}`);
    dispatch({
      type: 'RECEIVE_THREAD',
      thread: data
    });
  };

  const fetchThreads = async () => {
    try {
      const { data } = await axios.get(`/api/threads/`);
      dispatch({
        type: 'RECEIVE_THREADS',
        threads: data
      });

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
    try {
      const { data } = await axios.post(`/api/threads`, message);
      dispatch({
        type: 'ADD_MESSAGE',
        message: data
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="inbox">
      <div className="thread-list">
        <div className="thread-header">
          <span>Messages</span>
        </div>
        <Threads threads={threads} myId={me.id} handleClick={handleClick} />
      </div>
      <div className="thread">
        {thread.id && <MessageList thread={thread} myId={me.id} />}
        <MessageForm thread={thread} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Inbox;
