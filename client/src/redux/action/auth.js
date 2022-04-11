import jsCookie from 'js-cookie';
import api from '../../lib/api';
import { auth_types, network_types } from '../types';

export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      console.log(values);
      const res = await api.post('/auth/login', values);
      const userData = res.data.result;

      const stringifyData = JSON.stringify(userData.user);
      jsCookie.set('auth_token', userData.token);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userData.user,
      });

      setSubmitting(false);
    } catch (err) {
      console.log(err);

      // dispatch({
      //   type: network_types.NETWORK_ERROR,
      //   payload: {
      //     title: 'Login Failed',
      //     description: err.message,
      //   },
      // });
      setSubmitting(false);
    }
  };
};

export const registerUser = (values, setSubmitting) => {
  return async () => {
    try {
      console.log(values);
      if (values.password !== values.repeatPassword) {
        throw new Error('password not match');
      }
      if (values.password === values.repeatPassword) {
        delete values.repeatPassword;

        await axiosInstance.post('/auth/register', values);
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };
};
