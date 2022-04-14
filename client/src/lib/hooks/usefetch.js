import { useState, useEffect } from 'react';
import api from '../api';

const useFetch = (routes = '') => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      const res = await api.get(routes);
      setData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  }, [routes]);

  return [data];
};

export default useFetch;
