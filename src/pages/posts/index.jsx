import { Box } from '@chakra-ui/react';
import { validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react';
import ContentCard from '../../component/ContentCard';
import axiosInstance from '../../lib/api';

const postPage = () => {
  const [postList, setPostList] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get('/posts', {
        params: {
          _expand: 'user',
        },
      });
      setPostList(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderPost = () => {
    return postList.map((post) => {
      return (
        <Box m={4}>
          <ContentCard caption={post.caption} username={post.user.username} location={post.location} likes={post.likes} image={post.image} id={post.id} />
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
