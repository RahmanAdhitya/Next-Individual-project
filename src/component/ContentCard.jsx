// this page for display layout content

import { Avatar, Box, Center, HStack, Icon, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import React from 'react';

const ContentCard = () => {
  return (
    <Center mt={10}>
      <Stack borderRadius="lg" padding={3} shadow="dark-lg">
        <HStack>
          <Avatar border="2px solid teal" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Box>
            <Text fontWeight="medium">Dan Abrahmov</Text>
            <Text fontSize="sm" fontWeight="sm">
              location
            </Text>
          </Box>
        </HStack>
        <Box width="md" bgColor="blue">
          <Image src="https://images.unsplash.com/photo-1646281968703-b1e528f6b497?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
        </Box>
        <Box>
          <Icon boxSize={6} as={FaRegHeart} />
          <Icon boxSize={6} ms={4} as={FaRegCommentAlt} />
        </Box>
        <Box>
          <Text fontWeight="medium" fontSize="small">
            330,000 likes
          </Text>
          <Box width="md">
            <Text fontWeight="medium" fontSize="sm">
              <span>Dan Abrahmov</span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ex labore enim eius quos magni? Ratione maiores ducimus ullam ab?
            </Text>
          </Box>
        </Box>
      </Stack>
    </Center>
  );
};

export default ContentCard;
