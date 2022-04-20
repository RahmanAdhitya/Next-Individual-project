import React from 'react';
import { Avatar, Box, Flex } from '@chakra-ui/react';

const profileCard = ({ username, profilePic, bio, full_name }) => {
  return (
    <Flex>
      <Box>
        <Avatar src={profilePic} name={username} />
        <Text>{username}</Text>
        <Text>{full_name}</Text>
        <Text>{bio}</Text>
      </Box>
    </Flex>
  );
};

export default profileCard;
