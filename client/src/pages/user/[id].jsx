import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ContentCard from '../../component/ContentCard';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import axiosInstance from '../../lib/api';
import { useEffect, useState } from 'react';

const UserDetails = () => {
  const [postList, setPostList] = useState([]);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const id = router.query.id;
      console.log(id);
      const res = await axiosInstance.get(`/posts/user/${id}`);
      const data = res.data.result;
      console.log(data);
      setPostList(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <Box>
      <Navbar />
      {renderPost()}
    </Box>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   const { auth_token } = context.req.cookies;

//   try {
//     // this function call axios not axiosinstace because there no token in server
//     const res = await axios.get(`http://localhost:2060/posts/user/${id}`, {
//       headers: {
//         Authorization: auth_token,
//       },
//     });
//     const postList = res.data.result;

//     return { props: { postList } };
//   } catch (err) {
//     return {
//       props: {},
//     };
//   }
// }
export default UserDetails;
