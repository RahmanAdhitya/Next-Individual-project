import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import ContentCard from '../component/ContentCard';
import { useSelector } from 'react-redux';
import Navbar from '../component/Navbar';
import useFetch from '../lib/hooks/usefetch';

export default function Home() {
  const authSelector = useSelector((state) => state.auth);

  const [data] = useFetch('/posts');

  const renderPost = () => {
    return data.map((post) => {
      return (
        <Box m={4}>
          <ContentCard caption={post.caption} profilPic={post.User.image_url} username={post.User.username} location={post.location} likes={post.like_count} image={post.image_url} id={post.id} />
        </Box>
      );
    });
  };

  useEffect(() => {}, [data]);
  return (
    <>
      <Navbar />
      {renderPost()}
    </>
  );
}
