import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { loginSelector } from '../selectors';

import Dashboard from '../components/Dashboard';

import PageSection from '../components/PageSection';
import { StoreState } from '../reducers';
import { useAppDispatch } from '../hooks/useAppDispatch';
import Loader from '../components/Loader';

export default () => {
  const { isLoggedIn } = useSelector(loginSelector);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return (
      <PageSection className="!flex-row 2md:!flex-col">
        <Dashboard />
      </PageSection>
    );
  }
};
