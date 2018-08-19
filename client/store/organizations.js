import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const REQUEST_ORGANIZATIONS = 'REQUEST_ORGANIZATIONS';
const RECEIVE_ORGANIZATIONS = 'RECEIVE_ORGANIZATIONS';

/**
 * INITIAL STATE
 */
const intialOrganizations = {
  isLoading: false,
  active: {},
  all: []
};

/**
 * ACTION CREATORS
 */
const requestOrganizations = () => ({ type: REQUEST_ORGANIZATIONS });
const receiveOrganizations = organizations => ({
  type: RECEIVE_ORGANIZATIONS,
  organizations
});

/**
 * THUNK CREATORS
 */
export const fetchOrganizations = () => async dispatch => {
  dispatch(requestOrganizations());
  try {
    const { data } = await axios.get(`/api/organizations/`);
    dispatch(receiveOrganizations(data || []));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = intialOrganizations, action) {
  switch (action.type) {
    case REQUEST_ORGANIZATIONS:
      return {
        ...state,
        isLoading: true
      };

    case RECEIVE_ORGANIZATIONS:
      return {
        ...state,
        isLoading: false,
        all: action.organizations
      };

    default:
      return state;
  }
}
