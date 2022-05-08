import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';
import ContentCard from '../component/ContentCard';
import useFetch from '../lib/hooks/usefetch';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  const [page, setPage] = useState(1);
  // const [hasMoreItems, setHasMoreItems] = useState(true);

  const limitPage = 5;

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const [data, count] = useFetch('/posts', page);

  // const endPost = () => {
  //   (page * limitPage) % count === page * limitPage ? setHasMoreItems(true) : setHasMore(false);
  // };

  const renderPost = () => {
    return data.map((post) => {
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
            comment={post?.Comments}
            createDate={post?.createdAt}
            //
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
