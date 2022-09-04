export interface LoginRequestBody {
  username: string,
  password: string,
}

export enum MessageTypes {
  danger,
  success
}

export interface Message {
  message: string,
  type: MessageTypes
}

export interface LoggedInUser {
  role: string,
}

export enum ActionTypes {
  loggingIn,
  loginSuccess,
  loginFailed,

  loggingOut,
  logoutSuccess,
  logoutFailed,

  setMessage
}
