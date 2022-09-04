import { Dispatch } from 'redux';
import Axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

import {
  ActionTypes, LoginRequestBody,
} from '../types';

import { api } from '../../utils/apis';
import { LoggedInUser } from '../types';
import { FieldValues } from 'react-hook-form';

export interface LoggingInAction {
  type: ActionTypes.loggingIn
}

export interface LoginSuccessAction {
  type: ActionTypes.loginSuccess
  payload: LoggedInUser
}

export interface LoginFailedAction {
  type: ActionTypes.loginFailed;
  payload: string
}

export type LoginAction = LoggingInAction | LoginSuccessAction | LoginFailedAction;

const loggingIn: LoggingInAction = {
  type: ActionTypes.loggingIn
};

export const loginSuccess = (user: LoggedInUser): LoginSuccessAction => {
  return {
    type: ActionTypes.loginSuccess,
    payload: user,
  };
};

const loginFailed = (error: string): LoginFailedAction => {
  return {
    type: ActionTypes.loginFailed,
    payload: error,
  };
};

export const loginUser = (data: FieldValues, setIsError: (flag: boolean) => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<LoggingInAction>(loggingIn)
      const fetchedData = await Axios.post(`${api}/admin/login`, data, {
        withCredentials: true
      });

      if (fetchedData && fetchedData.data && fetchedData.data.data) {
        const user: LoggedInUser = fetchedData.data.data;
        dispatch<LoginSuccessAction>(loginSuccess(user));
      }

    } catch (err: any) {
      console.log(err);
      if (err && err.response && err.response.data && err.response.data.error) {
        dispatch<LoginFailedAction>(loginFailed(err.response.data.error));
      } else {
        dispatch<LoginFailedAction>(loginFailed("Some error occurred"));
      }
      setIsError(true);
    }
  };
};

export interface LoggingOutAction {
  type: ActionTypes.loggingOut
}

export interface LogoutSuccessAction {
  type: ActionTypes.logoutSuccess,
}

export interface LogoutFailedAction {
  type: ActionTypes.logoutFailed,
  payload: string
}

export type LogoutAction = LoggingOutAction | LogoutSuccessAction | LogoutFailedAction;

const loggingOut: LoggingOutAction = {
  type: ActionTypes.loggingOut,
};

const logoutSuccess: LogoutSuccessAction = {
  type: ActionTypes.logoutSuccess
};

const logoutFailed = (message: string): LogoutFailedAction => {
  return {
    type: ActionTypes.logoutFailed,
    payload: message,
  };
};

export const logoutUser = (navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<LoggingOutAction>(loggingOut);
      await Axios.get(`${api}/admin/logout`);
      dispatch<LogoutSuccessAction>(logoutSuccess);
      navigate('/');
    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<LogoutFailedAction>(logoutFailed(err.response.data.message));
      } else {
        dispatch<LogoutFailedAction>(logoutFailed("Some error occurred"));
      }
    }
  };
};
