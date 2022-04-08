import axios from 'axios';
import store from '../redux/store';
import { network_types } from '../redux/types';
import jsCookie from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:2060',
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.authorization = jsCookie.get('auth_token');
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status == 419) {
      jsCookie.remove('user_data');

      store.dispatch({
        type: auth_types.LOGOUT_USER,
      });
    }

    store.dispatch({
      type: network_types.NETWORK_ERROR,
      payload: {
        title: 'Network Error',
        description: err.message,
      },
    });

    return err;
  }
);

export default axiosInstance;
