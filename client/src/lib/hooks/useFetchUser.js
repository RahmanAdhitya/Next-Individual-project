import { useState, useEffect } from 'react';
import api from '../api';

const useFetchUser = (routes = '') => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      const res = await api.get(routes);
      setData(res.data.result);
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return [data];
};

export default useFetchUser;
