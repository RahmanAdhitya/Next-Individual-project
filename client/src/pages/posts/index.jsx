import { Box } from '@chakra-ui/react';
import { validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react';
import ContentCard from '../../component/ContentCard';
import axiosInstance from '../../lib/api';

const postPage = () => {
  const [postList, setPostList] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get('/posts');
      const data = res.data.result;
      // console.log(data[17].User.username);
      setPostList(data);
    } catch (err) {
      // console.log(err.message);
    }
  };

  const renderPost = () => {
    return postList.map((post) => {
      return (
        <Box m={4}>
          <ContentCard caption={post.caption} username={post.User.username} location={post.location} likes={post.like_count} image={post.image_url} id={post.id} />
        </Box>
      );
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return <div>{renderPost()}</div>;
};

export default postPage;
