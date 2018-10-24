import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const REQUEST_CATEGORY = 'REQUEST_CATEGORY';
const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY';

const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';

const REMOVE_ACTIVE_CATEGORY = 'REMOVE_ACTIVE_CATEGORY';
const REMOVE_ALL_CATEGORIES = 'REMOVE_ALL_CATEGORIES';

const ADD_TOPIC_TO_CATEGORY_ALL = 'ADD_TOPIC_TO_CATEGORY_ALL';
const REMOVE_TOPIC_FROM_ALL = 'REMOVE_TOPIC_FROM_ALL';

/**
 * INITIAL STATE
 */
const initialCategories = {
  isLoading: false,
  active: {},
  all: []
};

/**
 * ACTION CREATORS
 */
const requestCategories = () => ({ type: REQUEST_CATEGORIES });
const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

const requestCategory = () => ({ type: REQUEST_CATEGORY });
const receiveCategory = category => ({ type: RECEIVE_CATEGORY, category });

const createCategorySuccess = category => ({
  type: CREATE_CATEGORY_SUCCESS,
  category
});

const updateCategorySuccess = category => ({
  type: UPDATE_CATEGORY_SUCCESS,
  category
});

const deleteCategorySuccess = categoryId => ({
  type: DELETE_CATEGORY_SUCCESS,
  categoryId
});

export const addTopicToCategoryAll = topic => ({
  type: ADD_TOPIC_TO_CATEGORY_ALL,
  topic
});

export const removeTopicFromCategoryAll = topicIds => ({
  type: REMOVE_TOPIC_FROM_ALL,
  topicIds
});

export const removeActiveCategory = () => ({ type: REMOVE_ACTIVE_CATEGORY });

export const removeAllCategories = () => ({ type: REMOVE_ALL_CATEGORIES });

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => async dispatch => {
  dispatch(requestCategories());
  try {
    const { data } = await axios.get('/api/categories');
    dispatch(receiveCategories(data || []));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoriesByUser = () => async dispatch => {
  dispatch(requestCategories());
  try {
    const { data } = await axios.get(`/api/users/me/categories`);
    dispatch(receiveCategories(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchCategoryTopics = () => async dispatch => {
  dispatch(requestCategories());
  try {
    const { data } = await axios.get(`/api/categories/topics`);
    dispatch(receiveCategories(data || []));
  } catch (err) {
    console.error(err);
  }
};

export const fetchCategory = categoryId => async dispatch => {
  dispatch(requestCategory());
  try {
    const { data } = await axios.get(`/api/categories/${categoryId}`);
    dispatch(receiveCategory(data || []));
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = category => async dispatch => {
  try {
    const { data } = await axios.post(`/api/categories`, category);
    dispatch(createCategorySuccess(data || {}));
    history.push(`/categories`);
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = initialCategories, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
    case REQUEST_CATEGORY:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        all: action.categories
      };

    case RECEIVE_CATEGORY:
      return {
        ...state,
        isLoading: false,
        active: action.category
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.category]
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        all: [...state.all]
      };

    case ADD_TOPIC_TO_CATEGORY_ALL:
      return {
        ...state,
        all: [...state.all, action.topic]
      };

    case REMOVE_TOPIC_FROM_ALL:
      return {
        ...state,
        all: [...state.all].filter(
          item => action.topicIds.indexOf(item.id) === -1
        )
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        all: [...state.all].filter(item => item.id !== action.categoryId)
      };

    case REMOVE_ALL_CATEGORIES:
      return {
        ...state,
        all: []
      };

    case REMOVE_ACTIVE_CATEGORY:
      return {
        ...state,
        active: {}
      };

    default:
      return state;
  }
}
