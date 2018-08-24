import axios from 'axios';

/**
 * ACTION TYPES
 */
const REQUEST_USER_THREADS = 'REQUEST_USER_THREADS';
const RECEIVE_USER_THREADS = 'RECEIVE_USER_THREADS';

const REQUEST_USER_THREAD = 'REQUEST_USER_THREAD';
const RECEIVE_USER_THREAD = 'RECEIVE_USER_THREAD';

const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE';

const REMOVE_ACTIVE_MESSAGE = 'REMOVE_ACTIVE_MESSAGE';

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

export const removeActiveMessage = () => ({ type: REMOVE_ACTIVE_MESSAGE });

/**
 * THUNK CREATORS
 */
export const fetchThreads = () => async dispatch => {
  dispatch(requestThreads());
  try {
    const { data } = await axios.get(`/api/threads/`);
    dispatch(receiveThreads(data || []));
    if (data[0]) {
      dispatch(fetchThread(data[0].id));
    }
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
    dispatch(fetchThreads());
  } catch (err) {
    console.log(err);
  }
};

/**
 * INITIAL STATE
 */
const initialThreads = {
  isLoading: false,
  all: []
};


const initialThread = {
  isLoading: false,
  id: null,
  senderId: null,
  receiverId: null,
  messages: []
}

/**
 * REDUCER
 */
export const threadsReducer = (state = initialThreads, action) => {
  switch (action.type) {
    case REQUEST_USER_THREADS:
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

    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
      }

    default:
      return state;
  }
}

export const threadReducer = (state = initialThread, action) => {
  switch (action.type) {
    case REQUEST_USER_THREAD:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_USER_THREAD:
      return {
        ...state,
        isLoading: false,
        id: action.thread.id,
        senderId: action.thread.senderId,
        sender: action.thread.sender,
        receiverId: action.thread.receiverId,
        receiver: action.thread.receiver,
        messages: action.thread.messages
      };

    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    default:
      return state;
  }
}
