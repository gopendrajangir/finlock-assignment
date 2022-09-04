import { combineReducers } from 'redux';

import loginReducer, { LoginState } from './auth/login';
import messageReducer, { MessageState } from './message';

export interface StoreState {
  login: LoginState;
  message: MessageState;
}

export default combineReducers<StoreState>({
  login: loginReducer,
  message: messageReducer,
});
