import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';
import chatReducer from './chatReducer';
import mailReducer from './mailReducer';
import kanbanReducer from './kanbanReducer';
import companiesReducer from './companiesReducer';
import searchReducer from './searchReducer';


const rootReducer = combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  chat: chatReducer,
  mail: mailReducer,
  kanban: kanbanReducer,
  form: formReducer,
  companies: companiesReducer,
  search: searchReducer
});

export default rootReducer;
