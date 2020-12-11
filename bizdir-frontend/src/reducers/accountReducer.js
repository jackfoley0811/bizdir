/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SILENT_LOGIN,
  UPDATE_PROFILE,
  LOAD_ACCOUNTS,
  DEACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT,
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  REGENERATE_TOKEN
} from 'src/actions/accountActions';

const initialState = {
  user: null,
  newToken: null,
  accounts: []
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        draft.user = null;
      });
    }

    case LOGIN_SUCCESS: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case LOGIN_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.user = null;
      });
    }

    case SILENT_LOGIN: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case UPDATE_PROFILE: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case DEACTIVATE_ACCOUNT: {
      const { userId } = action.payload;

      return produce(state, (draft) => {
        let { accounts } = draft;
        for (let i = 0; i < accounts.length; i++) {
          if (accounts[i].id === userId) {
            accounts[i].is_active = false;
            accounts[i].token = {};
            break;
          }
        }
        draft.accounts = accounts;
      });
    }

    case ACTIVATE_ACCOUNT: {
      const { token } = action.payload;

      return produce(state, (draft) => {
        let { accounts } = draft;
        for (let i = 0; i < accounts.length; i++) {
          if (accounts[i].id === token.user_id) {
            accounts[i].is_active = true;
            accounts[i].token = token;
            break;
          }
        }
        draft.accounts = accounts;
      });
    }
    case LOAD_ACCOUNTS: {
      const { users, tokens } = action.payload;

      return produce(state, (draft) => {
        const accounts = [];
        users.forEach(user => {
          const newUser = { ...user };
          newUser.token = tokens.find(token => token.user_id === user.id)
          accounts.push(newUser);
        })
        draft.accounts = accounts;
      });
    }
    case ADD_ACCOUNT: {
      const { user, token } = action.payload;
      return produce(state, (draft) => {
        draft.accounts = [...draft.accounts, { ...user, token }];
      });
    }
    case EDIT_ACCOUNT: {
      return produce(state, (draft) => {
        const { user, isProfile } = action.payload;
        let { accounts } = draft;
        for (let i = 0; i < accounts.length; i++) {
          if (accounts[i].id === user.id) {
            const token = accounts[i].token;
            if (user.is_active) {
              accounts[i] = { ...user, token };
            }
            else {
              accounts[i] = { ...user, token: {} }
            }
            break;
          }
        }
        if(isProfile) {
          console.log('isProfile1', user)
          draft.user = user;
          localStorage.setItem('user', JSON.stringify(draft.user));
        }
        draft.accounts = accounts;
      });
    }
    case REGENERATE_TOKEN: {
      return produce(state, (draft) => {
        const { token } = action.payload;
        let { accounts } = draft;
        for (let i = 0; i < accounts.length; i++) {
          if (accounts[i].id === token.user_id) {
            accounts[i].token = token;
            break;
          }
        }
        draft.newToken = token;
        draft.accounts = accounts;
      });
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
