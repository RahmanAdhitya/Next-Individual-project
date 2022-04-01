// this page for display layout content

import { Avatar, Box, Center, HStack, Icon, Image, Stack, Text, Link as ChakraLink } from '@chakra-ui/react';
import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import React from 'react';
import NextLink from 'next/link';

const ContentCard = ({ id, username, likes, caption, image, location }) => {
  return (
    <Center mt={10}>
      <Stack borderRadius="lg" padding={3} shadow="dark-lg">
        <HStack>
          <Avatar border="2px solid teal" name="{username}" src="https://bit.ly/dan-abramov" />
          <Box>
            <Text fontWeight="medium">{username}</Text>
            <Text fontSize="sm" fontWeight="sm">
              {location}
            </Text>
          </Box>
        </HStack>
        <Image width="md" objectFit="cover" maxW="100%" src={image} />
        <Box>
          <Icon boxSize={6} as={FaRegHeart} />
          <NextLink href={`/posts/${id}`}>
            <Icon cursor="pointer" boxSize={6} ms={4} as={FaRegCommentAlt} />
          </NextLink>
        </Box>
        <Box>
          <Text fontWeight="medium" fontSize="small">
            {likes.toLocaleString()} likes
          </Text>
          <Box width="md">
            <Text fontSize="sm">
              <Text fontWeight="medium">{username}</Text>
              {caption}
            </Text>
          </Box>
        </Box>
      </Stack>
    </Center>
  );
};

export default ContentCard;
