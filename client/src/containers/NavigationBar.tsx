import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginSelector } from '../selectors';
import Button from '../shared/Button';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logoutUser } from '../actions';

function NavigationBar() {
  const { isLoggedIn } = useSelector(loginSelector);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <div className="bg-slate-900 h-16 flex items-center justify-between px-5">
      <h1 className="font-bold text-lg text-slate-100">FINLOCK LDAP</h1>
      {!isLoggedIn ? (
        <Button className="px-10" onClick={() => navigate('/login')}>
          Login
        </Button>
      ) : (
        <Button onClick={() => dispatch(logoutUser(navigate))} className="px-8">
          Log out
        </Button>
      )}
    </div>
  );
}

export default NavigationBar;
