import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';
import ContentCard from '../component/ContentCard';
import { useSelector } from 'react-redux';
import Navbar from '../component/Navbar';
import useFetch from '../lib/hooks/usefetch';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  const authSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const [data, count] = useFetch('/posts', page);
  console.log(count, data.length);
  if (data.length === count) {
    setMore(false);
  }

  const renderPost = () => {
    return data.map((post) => {
      return (
        <Box m={4}>
          <ContentCard
            caption={post.caption}
            profilPic={post?.User?.image_url}
            userId={post.UserId}
            username={post?.User?.username}
            location={post?.location}
            likes={post?.like_count}
            image={post?.image_url}
            id={post.id}
            comment={post?.Comments}
            createDate={post?.createdAt}
            //
          />
        </Box>
      );
    });
  };

  useEffect(() => {
    if (!authSelector.id) {
      router.push('/auth/login');
    }
  }, []);
  return (
    <>
      <Navbar />
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={more}
        loader={
          <Flex alignItems="center" justifyContent="center">
            <Spinner />
            <h4>Loading...</h4>
          </Flex>
        }
        endMessage={<Text>you have seen all!</Text>}
        //
      >
        {renderPost()}
      </InfiniteScroll>
    </>
  );
}
