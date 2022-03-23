import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ContentCardDetail from '../../component/ContentCardDetail';
import { useRouter } from 'next/router';
import axiosInstance from '../../lib/api';

const postDetail = ({ postDetailData }) => {
  const router = useRouter();

  console.log(postDetailData);
  const authSelector = useSelector((state) => state.auth);

  return (
    <Box>
      <ContentCardDetail username={postDetailData.user.username} location={postDetailData.location} likes={postDetailData.likes} image={postDetailData.image} caption={postDetailData.caption} />
    </Box>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const postId = context.query.id;
    const res = await axiosInstance.get(`/posts/${postId}`, {
      params: {
        _expand: 'user',
      },
    });

    return {
      props: {
        postDetailData: res.data,
      },
    };
  } catch (error) {}
};

export default postDetail;
