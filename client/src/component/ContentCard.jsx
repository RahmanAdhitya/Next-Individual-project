// this page for display layout content

import { Avatar, Box, HStack, Icon, Image, Stack, Text, Link as ChakraLink, Flex } from '@chakra-ui/react';
import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import React from 'react';
import NextLink from 'next/link';

const ContentCard = ({ profilPic, id, username, likes, caption, image, location }) => {
  return (
    <Flex justify={'center'} mt={8}>
      <Stack w="sm" boxSizeing="sm" borderRadius="lg" padding={3} shadow="dark-lg">
        <HStack>
          <Avatar border="2px solid teal" name={username} src={profilPic} />
          <Box>
            <Text fontWeight="medium">{username}</Text>
            <Text fontSize="sm" fontWeight="sm">
              {location}
            </Text>
          </Box>
        </HStack>
        <NextLink href={`/posts/${id}`}>
          <Image objectFit="cover" maxW="100%" src={image} />
        </NextLink>
        <Box>
          <Icon boxSize={6} as={FaRegHeart} />
          <Icon cursor="pointer" boxSize={6} ms={4} as={FaRegCommentAlt} />
        </Box>
        <Box>
          <Text fontWeight="medium" fontSize="small">
            {likes.toLocaleString()} Likes
          </Text>
          <Box>
            <Text fontSize="sm">
              <h6>{username}</h6>
              {caption}
            </Text>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ContentCard;
