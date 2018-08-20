import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_CLASSROOM = 'REQUEST_CLASSROOM';
const RECEIVE_CLASSROOM = 'RECEIVE_CLASSROOM';

const CREATE_CLASSROOM_SUCCESS = 'CREATE_CLASSROOM_SUCCESS';
const DELETE_CLASSROOM_SUCCESS = 'DELETE_CLASSROOM_SUCCESS';

const SET_VIDEO = 'SET_VIDEO';
const SET_AUDIO = 'SET_AUDIO';

/**
 * ACTION CREATORS
 */
const requestClassroom = () => ({ type: REQUEST_CLASSROOM });
const receiveClassroom = classroom => ({ type: RECEIVE_CLASSROOM, classroom });

const createClassroomSuccess = classroom => ({
  type: CREATE_CLASSROOM_SUCCESS,
  classroom
});

const deleteClassroomSuccess = classroom => ({
  type: DELETE_CLASSROOM_SUCCESS,
  classroom
});

export const setVideo = bool => ({ type: SET_VIDEO, video: bool });
export const setAudio = bool => ({ type: SET_AUDIO, audio: bool });

/**
 * THUNK CREATORS
 */
export const fetchClassroom = classroom => async dispatch => {
  dispatch(requestClassroom());
  try {
    const { data } = await axios.get(`/api/classrooms/${classroom}`);
    dispatch(receiveClassroom(data || {}));
  } catch (err) {
    console.error(err);
  }
};

export const createClassroom = classroomData => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/classrooms`, classroomData);
      dispatch(createClassroomSuccess(data || {}));
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteClassroom = classroom => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/classrooms/${classroom}`);
    dispatch(deleteClassroomSuccess(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * INITIAL STATE
 */
const initialClassroom = {
  isLoading: false,
  room: '',
  question: {},
  student: {},
  teacher: {},
  video: true,
  audio: true
};

/**
 * REDUCER
 */
export default function(state = initialClassroom, action) {
  switch (action.type) {
    case REQUEST_CLASSROOM:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_CLASSROOM:
      return {
        ...state,
        isLoading: false,
        room: action.classroom.room,
        question: action.classroom.question,
        student: action.classroom.student,
        teacher: action.classroom.teacher
      }

    case CREATE_CLASSROOM_SUCCESS:
      return {
        ...state,
        room: action.classroom.room,
        question: action.classroom.question,
        student: action.classroom.student,
        teacher: action.classroom.teacher
      };

    case DELETE_CLASSROOM_SUCCESS:
      return initialClassroom;

    case SET_VIDEO:
      return {
        ...state,
        video: action.video
      };

    case SET_AUDIO:
      return {
        ...state,
        audio: action.audio
      };

    default:
      return state;
  }
}
