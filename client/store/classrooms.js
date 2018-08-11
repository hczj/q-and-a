import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_CLASSROOMS = 'REQUEST_CLASSROOMS';
const RECEIVE_CLASSROOMS = 'RECEIVE_CLASSROOMS';

const REQUEST_CLASSROOM = 'REQUEST_CLASSROOM';
const RECEIVE_CLASSROOM = 'RECIEVE_CLASSROOM';

const CREATE_CLASSROOM_SUCCESS = 'CREATE_CLASSROOM_SUCCESS';

const SET_VIDEO = 'SET_VIDEO';
const SET_AUDIO = 'SET_AUDIO';

/**
 * INITIAL STATE
 */
const initialClassrooms = {
  isLoading: false,
  active: {},
  all: [],
  video: true,
  audio: true
};

/**
 * ACTION CREATORS
 */
const requestClassrooms = () => ({ type: REQUEST_CLASSROOMS });
const receiveClassrooms = classrooms => ({
  type: RECEIVE_CLASSROOMS,
  classrooms
});

const requestClassroom = () => ({ type: REQUEST_CLASSROOM });
const receiveClassroom = classroom => ({ type: RECEIVE_CLASSROOM, classroom });

const createClassroomSuccess = classroom => ({
  type: CREATE_CLASSROOM_SUCCESS,
  classroom
});

export const setVideo = bool => ({ type: SET_VIDEO, video: bool })
export const setAudio = bool => ({ type: SET_AUDIO, audio: bool })

/**
 * THUNK CREATORS
 */
export const createClassroom = classroom => dispatch => {
  dispatch(createClassroomSuccess(classroom))
}

/**
 * REDUCER
 */
export default function(state = initialClassrooms, action) {
  switch (action.type) {
    case CREATE_CLASSROOM_SUCCESS:
      return {
        ...state,
        all: [...new Set([...state.all, action.classroom])]
      };

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
