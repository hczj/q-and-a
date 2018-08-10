import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const REQUEST_USER_QUESTIONS = 'REQUEST_USER_QUESTIONS';

const REQUEST_QUESTION = 'REQUEST_QUESTION';
const RECEIVE_QUESTION = 'RECIEVE_QUESTION';

const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTIONS_SUCCESS';
const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';

const REMOVE_ACTIVE_QUESTION = 'REMOVE_ACTIVE_QUESTION';

/**
 * INITIAL STATE
 */
const initialQuestions = {
  isLoading: false,
  active: {},
  all: []
};

/**
 * ACTION CREATORS
 */
const requestQuestions = () => ({ type: REQUEST_QUESTIONS });
const receiveQuestions = questions => ({ type: RECEIVE_QUESTIONS, questions });

const requestQuestion = () => ({ type: REQUEST_QUESTION });
const receiveQuestion = question => ({ type: RECEIVE_QUESTION, question });

const createQuestionSuccess = question => ({
  type: CREATE_QUESTION_SUCCESS,
  question
});

const updateQuestionSuccess = question => ({
  type: UPDATE_QUESTION_SUCCESS,
  question
});

const deleteQuestionSuccess = questionId => ({
  type: DELETE_QUESTION_SUCCESS,
  questionId
});

export const removeActiveQuestion = () => ({ type: REMOVE_ACTIVE_QUESTION });

/**
 * THUNK CREATORS
 */
export const fetchQuestions = myId => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(`/api/questions/${myId ? myId : ''}`);
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchQuestionsByCategory = categoryId => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(`/api/questions/category/${categoryId}`);
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchQuestionsByUser = myId => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(`/api/questions/user/${myId}`);
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const createQuestion = question => async dispatch => {
  try {
    const { data } = await axios.post(`/api/questions`, question);
    dispatch(createQuestionSuccess(data || {}));
    history.push(`/question-queue`);
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialQuestions, action) {
  switch (action.type) {
    case REQUEST_QUESTIONS:
    case REQUEST_QUESTION:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_QUESTIONS:
      return {
        ...state,
        isLoading: false,
        all: action.questions
      };

    case RECEIVE_QUESTION:
      return {
        ...state,
        isLoading: false,
        active: action.question
      };

    case CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.question]
      };

    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        all: [...state.all]
      };

    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        all: [...state.all].filter(item => item.id !== action.questionId)
      };

    case REMOVE_ACTIVE_QUESTION:
      return {
        ...state,
        active: {}
      };

    default:
      return state;
  }
}
