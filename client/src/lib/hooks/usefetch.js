import { useState, useEffect } from 'react';
import api from '../api';

const useFetch = (routes = '') => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      const res = await api.get(routes);
      setData(res.data.result.rows);
      console.log(res.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return [data];
};

export default useFetch;
