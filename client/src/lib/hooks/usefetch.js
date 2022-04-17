import { useState, useEffect } from 'react';
import api from '../api';

const useFetch = (routes = '', params) => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      const res = await api.get(routes, params);
      setData(res.data.result);
      console.log(res.data.result);
    } catch (error) {
      console.log(error);
    }
  }, [routes]);

  return [data];
};

export default useFetch;
