import axios from 'src/utils/axios';
import authService from 'src/services/authService';

export const REGENERATE_TOKEN = '@account/token-regeneration'
export const EDIT_ACCOUNT = '@account/edit';
export const ADD_ACCOUNT = '@account/add';
export const ACTIVATE_ACCOUNT = '@account/activate';
export const DEACTIVATE_ACCOUNT = '@account/deactivate';
export const LOAD_ACCOUNTS = '@account/load';
export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const user = await authService.loginWithEmailAndPassword(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(user) {
  return (dispatch) => dispatch({
    type: SILENT_LOGIN,
    payload: {
      user
    }
  });
}

export function logout() {
  return async (dispatch) => {
    authService.logout();

    dispatch({
      type: LOGOUT
    });
  };
}

export function register(new_user) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      console.log(new_user)
      const user = await authService.registerUser({ first_name: new_user.firstName, last_name: new_user.lastName, email: new_user.email, username: new_user.email, password: new_user.password });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function updateProfile(update) {
  const request = axios.post('/api/account/profile', { update });

  return (dispatch) => {
    request.then((response) => dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    }));
  };
}

export function loadAccounts() {
  const request = axios.get('/api/auth/users');
  return (dispatch) => {
    return request.then((response) => dispatch({
      type: LOAD_ACCOUNTS,
      payload: response.data
    })).catch(err => console.error(err));
  };
}


export function deactivateAccount(userId) {
  const request = axios.delete(`/api/auth/users/${userId}`);
  return (dispatch) => {
    return request.then((response) => dispatch({
      type: DEACTIVATE_ACCOUNT,
      payload: { userId }
    })).catch(err => console.error(err));
  };
}

export function activateAccount(userId) {
  const request = axios.put(`/api/auth/users/${userId}`, { activate: true });
  return (dispatch) => {
    return request.then((response) => dispatch({
      type: ACTIVATE_ACCOUNT,
      payload: response.data
    })).catch(err => console.error(err));
  };
}


export function addAccount(new_user) {
  return async (dispatch) => {
    const user = await authService.registerUser(new_user);
    dispatch({
      type: ADD_ACCOUNT,
      payload: {
        user
      }
    });
  };
}

export function editAccount(user, isProfile = false) {
  let account = { ...user };
  delete account.token
  const request = axios.put(`/api/auth/users/${user.id}`, account);
  return (dispatch) => {
    return request.then((response) => dispatch({
      type: EDIT_ACCOUNT,
      payload: { ...response.data, isProfile }
    })).catch(err => console.error(err));
  };
}



export function regenerateToken(userId) {
  const request = axios.put(`/api/auth/users/${userId}`, { regenerateToken: true });
  return (dispatch) => {
    return request.then((response) => {
      dispatch({
        type: REGENERATE_TOKEN,
        payload: response.data
      })
      return response.data.key;
    }).catch(err => console.error(err));
  };
}

