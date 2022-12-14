import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// signup user thunk
export const signup = (user) => async (dispatch) => {
  const { username, email, firstName, lastName, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      firstName,
      lastName,
      password
    }),
  });
  const data = await response.json();
  // dispatch(setUser(data.user));
  dispatch(setUser(data));
  return response;
};

// login user thunk
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  // dispatch(setUser(data.user));
  dispatch(setUser(data));
  return response;
};

// logout user thunk
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

// restore session user thunk
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  // dispatch(setUser(data.user));
  dispatch(setUser(data));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;


/*
state shape

{
  user: {
    id,
    email,
    username,
    createdAt,
    updatedAt
  }
}

initialState = { user: null }
*/
