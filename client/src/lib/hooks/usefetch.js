import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import api from '../api';

const useFetch = (routes = '') => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (router.isReady) {
      try {
        const res = await api.get(routes);
        setData(res.data.result.rows);
        console.log(res.data.result.rows);
      } catch (err) {
        console.log(err);
      }
    }
  }, [router.isReady]);

  return [data];
};

export default useFetch;
