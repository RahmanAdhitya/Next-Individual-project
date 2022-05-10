import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';
import ContentCard from '../component/ContentCard';
import useFetch from '../lib/hooks/usefetch';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { post_types } from '../redux/types';
import api from '../lib/api';

export default function Home() {
  const [page, setPage] = useState(1);
  // const [hasMoreItems, setHasMoreItems] = useState(true);
  const [count, setCount] = useState();
  const dispatch = useDispatch([]);
  const postSelector = useSelector((state) => state.post);

  const limitPage = 5;

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  // const [data, count] = useFetch('/posts', page);

  const fetchPost = async () => {
    const res = await api.get('/posts', {
      params: {
        _limit: limitPage,
        _page: page,
      },
    });

    if (page === 1) {
      dispatch({
        type: post_types.FETCH_POST,
        payload: res?.data?.result?.rows,
      });
    } else {
      dispatch({
        type: post_types.UPDATE_POST,
        payload: res?.data?.result?.rows,
      });
    }

    // }

    setCount(res?.data?.result?.count);
  };

  console.log(postSelector);

  const data = postSelector.postList;

  useEffect(() => {
    fetchPost();
  }, [page]);

  const renderPost = () => {
    return data.map((post, index) => {
      return (
        <Box m={4}>
          <ContentCard
            caption={post?.caption}
            profilPic={post?.User?.image_url}
            userId={post?.UserId}
            username={post?.User?.username}
            location={post?.location}
            likes={post?.like_count}
            image={post?.image_url}
            id={post?.id}
            createDate={post?.createdAt}
            index={index}
          />
        </Box>
      );
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => fetchNextPage()}
        hasMore={(page * limitPage) % count === page * limitPage ? true : false}
        // hasmore={true}
        loader={
          <Flex mt="5" alignItems="center" justifyContent="center">
            <Spinner />
            <h4>Loading...</h4>
          </Flex>
        }
        endMessage={<Text textAlign="center">you have seen all!</Text>}
        scrollThreshold={1}
        onScroll
        //
      >
        {renderPost()}
      </InfiniteScroll>
    </>
  );
}
