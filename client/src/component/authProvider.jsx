// this page for check cookie if there's a cookie login in browsers
// for whole component in the project
// import to /pages/_app.js

import { useDispatch, useSelector } from 'react-redux';
import { auth_types } from '../redux/types';
import { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authselector = useSelector((state) => state.auth);

  useEffect(() => {
    const token = jsCookie.get('auth_token');
    const savedUserData = jsCookie.get('user_data');
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: parsedUserData,
      });
    }

    // if (!token) {
    //   if (router.pathname !== '/auth/login' || router.pathname !== 'auth/signup' || router.pathname !== 'auth/resetPassword' || router.pathname !== 'posts/') {
    //     router.push('/auth/login');
    //   }
    // }
  }, [router.pathname]);

  return <>{children}</>;
};

export default AuthProvider;
