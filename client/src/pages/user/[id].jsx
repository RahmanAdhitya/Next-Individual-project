import { Avatar, Box, Flex, Spacer, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ContentCard from '../../component/ContentCard';
import Navbar from '../../component/Navbar';
import { useEffect } from 'react';
import useFetch from '../../lib/hooks/usefetch';
import useFetchUser from '../../lib/hooks/useFetchUser';
import moment from 'moment';
import NextLink from 'next/link';

const UserDetails = () => {
  const router = useRouter();

  const { id } = router.query;
  const [profile] = useFetchUser(`/auth/user/${id}`);
  const [activitiesData] = useFetchUser(`/posts/like/${id}`);
  // console.log(id);
  // console.log(activitiesData);
  const [data] = useFetch(`/posts/user/${id}`);
  // console.log(data);

  const renderPost = () => {
    console.log(router.isReady);
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
      <Box w={200} padding={3} ms="5" mt={8} shadow="inner" bgColor="gray.100" borderRadius="4">
        <Flex justify="center">
          <Avatar size="xl" src={profile.image_url} border="3px solid teal" />
        </Flex>
        <Text fontWeight="bold" textAlign="center">{`@${profile.username}`}</Text>
        <Text textAlign="center">{profile.full_name}</Text>
        <Text textAlign="center">{profile.bio}</Text>
      </Box>
    );
  };
  const renderActivities = () => {
    return activitiesData.map((val) => {
      return (
        <NextLink href={`/posts/${val.Post.id}`}>
          <Box cursor="pointer" padding={3} mt="2" shadow="lg" bgColor="gray.100" borderRadius="4">
            <Text textAlign="center">{`${profile.username} loved ${val.Post.User.username} Post, ${moment(val.createdAt).startOf('day').fromNow()}`}</Text>
          </Box>
        </NextLink>
      );
    });
  };

  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);

  return (
    <Box>
      <Navbar />
      <Flex justify="space-between">
        <Box>{renderProfile()}</Box>
        <Box>{renderPost()}</Box>
        <Box mt={8} me={5}>
          {renderActivities()}
        </Box>
      </Flex>
    </Box>
  );
};

export default UserDetails;
