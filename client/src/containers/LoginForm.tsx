import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { loginUser } from '../actions/auth/login';

import Button from '../shared/Button';
import {
  FormGroup,
  FormInput,
  FormLabel,
  FormFeedback,
} from '../components/Form';

import { StoreState } from '../reducers';

import { useAppDispatch } from '../hooks/useAppDispatch';

const selector = createSelector(
  [(state: StoreState) => state.login],
  (login) => login
);

function LoginForm() {
  const { isLoggingIn, loginError } = useSelector(selector);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    setIsError(false);
    dispatch(loginUser(data, setIsError));
  });

  return (
    <form onSubmit={onSubmit}>
      {loginError && isError && (
        <p className="bg-red-500 text-white text-sm p-3 w-100 rounded mb-3">
          {loginError}
        </p>
      )}
      <FormGroup>
        <FormLabel htmlFor="input_username">Username</FormLabel>
        <FormInput
          id="input_username"
          {...register('username', {
            required: true,
          })}
          name="username"
          type="text"
          placeholder="Enter username"
        />
        <FormFeedback show={errors.username ? true : false}>
          Please provide username
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="input_password">Password</FormLabel>
        <FormInput
          id="input_password"
          {...register('password', { required: true })}
          name="password"
          type="password"
          placeholder="Enter Password"
        />
        <FormFeedback show={errors.password ? true : false}>
          Please provide password
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button disabled={isLoggingIn}>
          {!isLoggingIn ? 'Login' : 'Logging in...'}
        </Button>
      </FormGroup>
    </form>
  );
}

export default LoginForm;
