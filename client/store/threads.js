import axios from 'axios';

/**
 * ACTION TYPES
 */
const REQUEST_USER_THREADS = 'REQUEST_USER_THREADS';
const RECEIVE_USER_THREADS = 'RECEIVE_USER_THREADS';

const REQUEST_USER_THREAD = 'REQUEST_USER_THREAD';
const RECEIVE_USER_THREAD = 'RECEIVE_USER_THREAD';

const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE';

/**
 * INITIAL STATE
 */
const initialThreads = {
  isLoading: false,
  active: {},
  all: []
};

/**
 * ACTION CREATORS
 */
const requestThreads = () => ({ type: REQUEST_USER_THREADS });
const receiveThreads = threads => ({ type: RECEIVE_USER_THREADS, threads });

const requestThread = () => ({ type: REQUEST_USER_THREAD });
const receiveThread = thread => ({ type: RECEIVE_USER_THREAD, thread });

const createMessageSuccess = message => ({
  type: CREATE_MESSAGE_SUCCESS,
  message
});

/**
 * THUNK CREATORS
 */
export const fetchThreads = () => async dispatch => {
  dispatch(requestThreads());
  try {
    const { data } = await axios.get(`/api/threads/`);
    dispatch(receiveThreads(data || []));
  } catch (err) {
    console.log(err);
  }
};

export const fetchThread = threadId => async dispatch => {
  dispatch(requestThread());
  try {
    const { data } = await axios.get(`/api/threads/${threadId}`);
    dispatch(receiveThread(data || []));
  } catch (err) {
    console.log(err);
  }
};

export const createMessage = message => async dispatch => {
  try {
    const { data } = await axios.post(`/api/threads`, message);
    dispatch(createMessageSuccess(data || {}));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialThreads, action) {
  switch (action.type) {
    case REQUEST_USER_THREADS:
    case REQUEST_USER_THREAD:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_USER_THREADS:
      return {
        ...state,
        isLoading: false,
        all: action.threads
      };

    case RECEIVE_USER_THREAD:
      return {
        ...state,
        isLoading: false,
        active: action.thread
      };

    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          messages: [...state.active.messages, action.message]
        }
      };

    default:
      return state;
  }
}
