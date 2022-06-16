import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const res = await axios.get('/auth/me');
  return dispatch(setAuth(res.data));
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await axios.delete('/auth');
    history.push('/login');
    return dispatch(setAuth({}));
  } catch (err) {
    console.log('DELETE ERR FE', err);
    next(err);
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
