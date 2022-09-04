import React from 'react';
import { LoginState } from '../reducers/auth/login';

export const UserContext = React.createContext<LoginState>({} as LoginState);