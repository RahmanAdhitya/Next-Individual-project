// this page for display layout content

import { Avatar, Box, HStack, Icon, Image, Stack, Text, Link as ChakraLink, Flex, Input, InputRightElement, InputGroup, FormLabel } from '@chakra-ui/react';
import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import api from '../lib/api';
import { FiSend } from 'react-icons/fi';

const ContentCard = ({ profilPic, id, username, likes, caption, image, location, comment }) => {
  const [addComment, setAddComment] = useState(true);

  const refreshPage = () => {
    window.location.reload();
  };
  const formik = useFormik({
    initialValues: {
      PostId: id,
      UserId: '',
      comment: '',
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  const postCommentHandler = async () => {
    await api.post(`/posts/${id}-comment`, formik.values);

    refreshPage();
  };

  const renderComment = () => {
    return comment.map((comment) => {
      return (
        <Text fontSize="sm">
          <span style={{ fontWeight: 'bold' }}>{comment.User.username}</span>
          &nbsp;{comment.comment}
        </Text>
      );
    });
  };

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
          <Icon onClick={() => setAddComment(!addComment)} cursor="pointer" boxSize={6} ms={4} as={FaRegCommentAlt} />
        </Box>
        <Box>
          <Text fontWeight="medium" fontSize="small">
            {likes.toLocaleString()} Likes
          </Text>
          <Box>
            <Text fontSize="sm">
              <span style={{ fontWeight: 'bold' }}>{username}</span>&nbsp;{caption}
            </Text>
          </Box>
          <Box>{renderComment()}</Box>
        </Box>
        <Box hidden={addComment ? true : false}>
          <InputGroup>
            <FormLabel htmlFor="comment"></FormLabel>
            <Input
              id="comment"
              placeholder="comment"
              name="comment"
              onChange={inputHandler}
              //
            />

            <InputRightElement>
              <Icon
                as={FiSend}
                cursor="pointer"
                onClick={() => postCommentHandler()}
                //
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ContentCard;
