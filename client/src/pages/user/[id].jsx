import { Avatar, Box, Flex, Spacer, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ContentCard from '../../component/ContentCard';
import Navbar from '../../component/Navbar';
import { useEffect } from 'react';
import useFetch from '../../lib/hooks/usefetch';
import useFetchUser from '../../lib/hooks/useFetchUser';
import profileCard from '../../component/profileCard';

const UserDetails = () => {
  const router = useRouter();

  const { id } = router.query;
  console.log(id);
  const [data] = useFetch(`/posts/user/${id}`);
  console.log(data);
  const [profile] = useFetchUser(`/auth/user/${id}`);

  const renderPost = () => {
    return data.map((post) => {
      return (
        <Box mt={4}>
          <ContentCard
            caption={post.caption}
            profilPic={post.User.image_url}
            userId={post.UserId}
            username={post.User.username}
            location={post.location}
            likes={post.like_count}
            image={post.image_url}
            id={post.id}
            comment={post.Comments}
            createDate={post.createdAt}
            //
          />
        </Box>
      );
    });
  };

  const renderProfile = () => {
    return (
      <Box w="xs" padding={3} ms="5" mt={8} shadow="inner" bgColor="gray.100" borderRadius="4">
        <Flex justify="center">
          <Avatar size="xl" src={profile.image_url} border="3px solid teal" />
        </Flex>

        <Text fontWeight="bold" textAlign="center">{`@${profile.username}`}</Text>
        <Text textAlign="center">{profile.full_name}</Text>
        <Text textAlign="center">{profile.bio}</Text>
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
        <Spacer />
        <Flex justify={'center'}>
          <Box>{renderPost()}</Box>
        </Flex>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default UserDetails;
