import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ContentCard from '../../component/ContentCard';
import Navbar from '../../component/Navbar';
import { useEffect } from 'react';
import useFetch from '../../lib/hooks/usefetch';
import profileCard from '../../component/profileCard';

const UserDetails = () => {
  const router = useRouter();

  const id = router.query.id;
  const [data] = useFetch(`/posts/user/${id}`);
  const [profile] = useFetch(`/auth/user/${id}`);

  const renderPost = () => {
    return data.map((post) => {
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

  const renderProfile = () => {
    return (
      <Box justifyItems="center">
        <Avatar src={profile.image_url} />
        <Text>{profile.username}</Text>
        <Text>{profile.full_name}</Text>
        <Text>{profile.bio}</Text>
      </Box>
    );
  };

  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);

  return (
    <Box>
      <Navbar />
      <Flex>
        <Box>{renderProfile()}</Box>
        <Flex justify={'center'}>
          <Box>{renderPost()}</Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserDetails;
