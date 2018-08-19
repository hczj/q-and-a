import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_ME = 'REQUEST_ME';
const RECEIVE_ME = 'RECEIVE_ME';
const REMOVE_ME = 'REMOVE_ME';

const REQUEST_USERS = 'REQUEST_USERS';
const RECEIVE_USERS = 'RECEIVE_USERS';

const REQUEST_USER = 'REQUEST_USER';
const RECEIVE_USER = 'RECEIVE_USER';

const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

/**
 * ACTION CREATORS
 */
const requestMe = () => ({ type: REQUEST_ME });
const receiveMe = me => ({ type: RECEIVE_ME, me });
const removeMe = () => ({ type: REMOVE_ME });

const requestUsers = () => ({ type: REQUEST_USERS });
const receiveUsers = users => ({ type: RECEIVE_USERS, users });

const requestUser = () => ({ type: REQUEST_USER });
const receiveUser = user => ({ type: RECEIVE_USER, user });

const createUserSuccess = user => ({ type: CREATE_USER_SUCCESS, user });
const updateUserSuccess = user => ({ type: UPDATE_USER_SUCCESS, user });
const deleteUserSuccess = userId => ({ type: DELETE_USER_SUCCESS, userId });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  dispatch(requestMe());
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(receiveMe(data || {}));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (formData, method) => async dispatch => {
  dispatch(requestMe());
  let res;
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      organizationId,
      isTeacher
    } = formData;
    res = await axios.post(`/auth/${method}`, {
      firstName,
      lastName,
      email,
      password,
      organizationId,
      isTeacher
    });
  } catch (authError) {
    return dispatch(receiveMe({ error: authError }));
  }

  try {
    dispatch(receiveMe(res.data));
    history.push('/dashboard');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeMe());
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

export const fetchUsers = () => async dispatch => {
  dispatch(requestUsers());
  try {
    const { data } = await axios.get('/api/users');
    dispatch(receiveUsers(data || []));
  } catch (error) {
    return dispatch(receiveUsers({ error }));
  }
};

export const fetchUser = userId => async dispatch => {
  dispatch(requestUser());
  try {
    const { data } = await axios.get(`/api/users/${userId}`);
    dispatch(receiveUser(data || {}));
  } catch (err) {
    console.error(err);
  }
};

export const createUser = user => async dispatch => {
  try {
    const { data } = await axios.post(`/api/users`, user);
    dispatch(createUserSuccess(data || {}));
    history.push(`/manage/users/${data.id}`);
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = user => async dispatch => {
  try {
    const { data } = await axios.put(`/api/users/${user.id}`, user);
    dispatch(updateUserSuccess(data || {}));
    history.goBack();
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = user => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/users/${user.id}`);
    dispatch(deleteUserSuccess(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * INITIAL STATE
 */
const initialMe = {};

const initialUsers = {
  isLoading: false,
  active: {},
  all: []
};

/**
 * REDUCERS
 */
export const meReducer = (state = initialMe, action) => {
  switch (action.type) {
    case REQUEST_ME:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_ME:
      return {
        ...state,
        ...action.me,
        isLoading: false
      };
    case REMOVE_ME:
      return initialMe;
    default:
      return state;
  }
};

export const usersReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case REQUEST_USERS:
    case REQUEST_USER:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_USERS:
      return {
        ...state,
        isLoading: false,
        all: action.users
      };

    case RECEIVE_USER:
      return {
        ...state,
        isLoading: false,
        active: action.user
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.user]
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        all: [...state.all]
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        all: [...state.all].filter(item => item.id !== action.userId)
      };

    default:
      return state;
  }
};
