import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import api from '../api';

const useFetch = (routes = '', pageNumber = 0) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [count, setCount] = useState();

  console.log(pageNumber);

  const maxPostPerPage = 5;

  useEffect(async () => {
    if (router.isReady) {
      try {
        const res = await api.get(routes, {
          params: {
            _limit: maxPostPerPage,
            _page: pageNumber,
          },
        });
        setData((prevData) => [...prevData, ...res.data.result.rows]);
        setCount(res.data.result.count);
        console.log(res.data.result);
      } catch (err) {
        console.log(err);
      }
    }
  }, [router.isReady, pageNumber]);

  return [data, count];
};

export default useFetch;
