import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const REQUEST_QUESTION = 'REQUEST_QUESTION';
const RECEIVE_QUESTION = 'RECEIVE_QUESTION';

const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';

const REMOVE_ACTIVE_QUESTION = 'REMOVE_ACTIVE_QUESTION';

const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

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

const deleteCommentSuccess = question => ({
  type: DELETE_COMMENT_SUCCESS,
  question
});

const createCommentSuccess = question => ({
  type: CREATE_COMMENT_SUCCESS,
  question
});

export const removeActiveQuestion = () => ({ type: REMOVE_ACTIVE_QUESTION });

/**
 * THUNK CREATORS
 */
export const fetchQuestions = () => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(`/api/questions/`);
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchQuestion = questionId => async dispatch => {
  dispatch(requestQuestion());
  try {
    const { data } = await axios.get(`/api/questions/${questionId}`);
    dispatch(receiveQuestion(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchQuestionsByCategory = categoryId => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(`/api/categories/${categoryId}/questions`);
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchQuestionsByUser = () => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(`/api/users/me/questions`);
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const orderQuestions = query => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(
      `/api/questions/${query.location.search ? query.location.search : ''}`
    );
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const orderQuestionsByCategory = (
  categoryId,
  query
) => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data } = await axios.get(
      `/api/categories/${categoryId}/questions/${
        query.location.search ? query.location.search : ''
      }`
    );
    dispatch(receiveQuestions(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const createQuestion = question => async dispatch => {
  try {
    const { data } = await axios.post(`/api/questions`, question);
    dispatch(createQuestionSuccess(data || {}));
    history.push(`/questions`);
  } catch (err) {
    console.error(err);
  }
};

export const createComment = input => async dispatch => {
  try {
    const { content, questionId } = input;
    const { data } = await axios.post(`/api/questions/${questionId}/comment`, {
      content
    });
    dispatch(createCommentSuccess(data || {}));
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = (commentId, questionId) => async dispatch => {
  try {
    const { data } = await axios.delete(
      `/api/questions/${questionId}/comment/${commentId}`
    );
    dispatch(deleteCommentSuccess(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateQuestion = question => async dispatch => {
  try {
    const { data } = await axios.put(`/api/questions/${question.id}`, question);
    dispatch(updateQuestionSuccess(data || {}));
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

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        active: action.question
      };

    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        active: action.question
      };

    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        all: [...state.all].filter(item => item.id !== action.questionId)
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        active: action.question
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
