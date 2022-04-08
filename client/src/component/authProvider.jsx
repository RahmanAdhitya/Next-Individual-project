// this page for check cookie if there's a cookie login in browsers
// for whole component in the project
// import to /pages/_app.js

import { useDispatch } from 'react-redux';
import { auth_types } from '../redux/types';
import { useEffect } from 'react';
import jsCookie from 'js-cookie';
import Navbar from './Navbar';
import { useRouter } from 'next/router';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const result = useEffect(() => {
    const savedUserData = jsCookie.get('user_data');
    console.log(savedUserData);

    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: parsedUserData,
      });
    }

    if (!savedUserData) {
      router.push('/auth/login');
    }
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthProvider;
