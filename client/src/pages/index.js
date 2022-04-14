import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ContentCard from '../component/ContentCard';
import { useDispatch, useSelector } from 'react-redux';
import api from '../lib/api';
// import { fetchContent } from '../redux/action/post';
import Navbar from '../component/Navbar';

export default function Home() {
  const authSelector = useSelector((state) => state.auth);
  const [postList, setPostList] = useState([]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get('/posts');
      setPostList(data.result);
    } catch (error) {}
  };

  const renderPost = () => {
    return postList.map((post) => {
      return (
        <Box m={4}>
          <ContentCard caption={post.caption} profilPic={post.User.image_url} username={post.User.username} location={post.location} likes={post.like_count} image={post.image_url} id={post.id} />
        </Box>
      );
    });
  };

  useEffect(() => {
    if (authSelector) {
      fetchPost();
    }
  }, []);
  return (
    <>
      <Navbar />
      {renderPost()}
    </>
  );
}
