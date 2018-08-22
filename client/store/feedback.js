import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_ALL_FEEDBACK = 'REQUEST_ALL_FEEDBACK';
const RECEIVE_ALL_FEEDBACK = 'RECEIVE_ALL_FEEDBACK';

const REQUEST_FEEDBACK = 'REQUEST_FEEDBACK';
const RECEIVE_FEEDBACK = 'RECEIVE_FEEDBACK';

const CREATE_FEEDBACK_SUCCESS = 'CREATE_FEEDBACK_SUCCESS';
const UPDATE_FEEDBACK_SUCCESS = 'UPDATE_FEEDBACK_SUCCESS';
const DELETE_FEEDBACK_SUCCESS = 'DELETE_FEEDBACK_SUCCESS';

const REMOVE_ACTIVE_FEEDBACK = 'REMOVE_ACTIVE_FEEDBACK';

/**
 * ACTION CREATORS
 */
const requestAllFeedback = () => ({ type: REQUEST_ALL_FEEDBACK });
const receiveAllFeedback = feedback => ({
  type: RECEIVE_ALL_FEEDBACK,
  feedback
});

const requestFeedback = () => ({ type: REQUEST_FEEDBACK });
const receiveFeedback = feedback => ({ type: RECEIVE_FEEDBACK, feedback });

const createFeedbackSuccess = feedback => ({
  type: CREATE_FEEDBACK_SUCCESS,
  feedback
});

const updateFeedbackSuccess = feedback => ({
  type: UPDATE_FEEDBACK_SUCCESS,
  feedback
});

const deleteFeedbackSuccess = feedbackId => ({
  type: DELETE_FEEDBACK_SUCCESS,
  feedbackId
});

export const removeActiveFeedback = () => ({ type: REMOVE_ACTIVE_FEEDBACK });

/**
 * THUNK CREATORS
 */
export const fetchAllFeedback = () => async dispatch => {
  dispatch(requestAllFeedback());
  try {
    const { data } = await axios.get(`/api/feedback/`);
    dispatch(receiveAllFeedback(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchFeedback = feedbackId => async dispatch => {
  dispatch(requestFeedback());
  try {
    const { data } = await axios.get(`/api/feedback/${feedbackId}`);
    dispatch(receiveFeedback(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const createFeedback = feedback => async dispatch => {
  try {
    const { data } = await axios.post(`/api/feedback`, feedback);
    dispatch(createFeedbackSuccess(data || {}));
    history.push(`/dashboard`);
  } catch (err) {
    console.error(err);
  }
};

export const updateFeedback = feedback => async dispatch => {
  try {
    const { data } = await axios.put(`/api/feedback/${feedback.id}`, feedback);
    dispatch(updateFeedbackSuccess(data || {}));
  } catch (err) {
    console.error(err);
  }
};

/**
 * INITIAL STATE
 */
const initialFeedback = {
  isLoading: false,
  active: {},
  all: []
};

/**
 * REDUCER
 */
export default function(state = initialFeedback, action) {
  switch (action.type) {
    case REQUEST_ALL_FEEDBACK:
    case REQUEST_FEEDBACK:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_ALL_FEEDBACK:
      return {
        ...state,
        isLoading: false,
        all: action.feedback
      };

    case RECEIVE_FEEDBACK:
      return {
        ...state,
        isLoading: false,
        active: action.feedback
      };

    case CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.feedback]
      };

    case UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        active: action.feedback
      };

    case DELETE_FEEDBACK_SUCCESS:
      return {
        ...state,
        all: [...state.all].filter(item => item.id !== action.feedbackId)
      };

    case REMOVE_ACTIVE_FEEDBACK:
      return {
        ...state,
        active: {}
      };

    default:
      return state;
  }
}
