import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_CLASROOM = 'REQUEST_CLASROOM';
const RECEIVE_CLASROOM = 'RECEIVE_CLASROOM';

const CREATE_CLASSROOM_SUCCESS = 'CREATE_CLASSROOM_SUCCESS';
const DELETE_CLASSROOM_SUCCESS = 'DELETE_CLASSROOM_SUCCESS';

const SET_VIDEO = 'SET_VIDEO';
const SET_AUDIO = 'SET_AUDIO';

/**
 * INITIAL STATE
 */
const initialClassroom = {
  room: '',
  questionId: null,
  studentId: null,
  teacherId: null,
  video: true,
  audio: true
};

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
  console.log('CLASSROOM', classroom);
  try {
    const { data } = await axios.delete(`/api/classrooms/${classroom}`);
    dispatch(deleteClassroomSuccess(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialClassroom, action) {
  switch (action.type) {
    case CREATE_CLASSROOM_SUCCESS:
      return {
        ...state,
        room: action.classroom.room,
        questionId: action.classroom.questionId,
        studentId: action.classroom.studentId,
        teacherId: action.classroom.teacherId
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
