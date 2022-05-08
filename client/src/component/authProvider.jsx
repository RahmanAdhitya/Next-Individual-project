// this page for check cookie if there's a cookie login in browsers
// for whole component in the project
// import to /pages/_app.js

import { useDispatch } from 'react-redux';
import { auth_types } from '../redux/types';
import { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    console.log('render1');
    const token = jsCookie.get('auth_token');
    const savedUserData = jsCookie.get('user_data');
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: parsedUserData,
      });
    }

    if (!token) {
      // if (router.pathname !== '/auth/login' || router.pathname !== 'auth/signup' || router.pathname !== 'auth/resetPassword') {
      //   router.push('/auth/login');
      //   setHidden(true);
      // }
    }
  }, []);

  return (
    <>
      <Navbar hidden={hidden} />
      {children}
    </>
  );
};

export default AuthProvider;
