import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ContentCard from '../../component/ContentCard';
import axios from 'axios';
import Navbar from '../../component/Navbar';

const postDetail = ({ post }) => {
  const router = useRouter();
  console.log(post);
  return (
    <Box>
      <Navbar />
      <ContentCard caption={post.caption} profilPic={post.User.image_url} username={post.User.username} location={post.location} likes={post.like_count} image={post.image_url} id={post.id} />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { auth_token } = context.req.cookies;

  try {
    // this function call axios not axiosinstace because there no token in server
    const res = await axios.get(`http://localhost:2060/posts/${id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const post = res.data.result;

    return { props: { post } };
  } catch (err) {
    return {
      props: {},
    };
  }
}
export default postDetail;
