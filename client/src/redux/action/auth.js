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
      jsCookie.set('user_data', stringifyData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userData.user,
      });

      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };
};
export const signUp = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      await api.post('/auth/register', values);

      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };
};
