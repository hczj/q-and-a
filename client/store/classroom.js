/**
 * ACTION TYPES
 */
const CREATE_CLASSROOM = 'CREATE_CLASSROOM';
const DELETE_CLASSROOM = 'DELETE_CLASSROOM';

const SET_VIDEO = 'SET_VIDEO';
const SET_AUDIO = 'SET_AUDIO';

/**
 * INITIAL STATE
 */
const initialClassroom = {
  id: null,
  video: true,
  audio: true
};

/**
 * ACTION CREATORS
 */
export const createClassroom = classroom => ({
  type: CREATE_CLASSROOM,
  classroom
});

export const deleteClassroom = () => ({ type: DELETE_CLASSROOM });

export const setVideo = bool => ({ type: SET_VIDEO, video: bool })
export const setAudio = bool => ({ type: SET_AUDIO, audio: bool })

/**
 * REDUCER
 */
export default function(state = initialClassroom, action) {
  switch (action.type) {
    case CREATE_CLASSROOM:
      return {
        ...state,
        id: action.classroom
      };

    case DELETE_CLASSROOM:
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