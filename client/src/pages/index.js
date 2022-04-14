import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ContentCard from '../component/ContentCard';
import { useDispatch, useSelector } from 'react-redux';
import api from '../lib/api';
import Navbar from '../component/Navbar';
import useFetch from '../lib/hooks/fetch';

export default function Home() {
  const authSelector = useSelector((state) => state.auth);
  const [postList, setPostList] = useState([]);

  // const fetchPost = async () => {
  //   try {
  //     const { data } = await api.get('/posts');
  //     setPostList(data.result);
  //   } catch (error) {}
  // };

  const [data] = useFetch('/posts');
  // setPostList(data);

  const renderPost = () => {
    // console.log(postList);
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
