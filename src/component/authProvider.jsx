// this page for check cookie if there's a cookie login in browsers

import { useDispatch } from 'react-redux';
import { auth_types } from '../redux/types';
import { useEffect } from 'react';
import jsCookie from 'js-cookie';
import Navbar from './Navbar';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const savedUserData = jsCookie.get('user_data');

  useEffect(() => {
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: parsedUserData,
      });
    }
  }, [savedUserData]);

  return (
    <>
      {savedUserData ? <Navbar /> : ''}
      {children}
    </>
  );
};

export default AuthProvider;
