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

      const stringifiedUserData = JSON.stringify(userData);

      jsCookie.set('user_data', stringifiedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userData,
      });

      setSubmitting(false);
    } catch (err) {
      console.log(err);

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
