import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ContentCard from '../../component/ContentCard';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import { ApiError } from 'next/dist/server/api-utils';
import axiosInstance from '../../lib/api';
import { useEffect, useState } from 'react';

const UserDetails = ({ postList }) => {
  const renderPost = () => {
    return postList.map((post) => {
      return (
        <ContentCard
          caption={post.caption}
          profilPic={post.User.image_url}
          username={post.User.username}
          location={post.location}
          likes={post.like_count}
          image={post.image_url}
          id={post.id}
          comment={post.Comments}
          userId={post.UserId}
          //
        />
      );
    });
  };

  return (
    <Box>
      <Navbar />
      {renderPost()}
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { auth_token } = context.req.cookies;

  try {
    // this function call axios not axiosinstace because there no token in server
    const res = await axios.get(`http://localhost:2060/posts/user/${id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const postList = res.data.result;

    return { props: { postList } };
  } catch (err) {
    return {
      props: {},
    };
  }
}
export default UserDetails;
