import jsCookie from 'js-cookie';
import axiosInstance from '../../lib/api';
import { auth_types, network_types } from '../types';

export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      console.log(values);
      const res = await axiosInstance.post('/auth/login', values);
      const userData = res.data.result;

      console.log(userData);

      const stringifyData = JSON.stringify(userData.user);
      jsCookie.set('auth_token', userData.token);
      jsCookie.set('user_data', stringifyData);

      console.log('');
      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userData.user,
      });

      setSubmitting(false);
    } catch (err) {
      // console.log(err);

      dispatch({
        type: network_types.NETWORK_ERROR,
        payload: {
          title: 'Login Failed',
          description: err.message,
        },
      });
      setSubmitting(false);
    }
  };
};
