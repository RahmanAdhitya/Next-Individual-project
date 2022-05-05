// this page for display layout content

import {
  Avatar,
  Box,
  Icon,
  Image,
  Stack,
  Text,
  Link as ChakraLink,
  Flex,
  Input,
  InputRightElement,
  InputGroup,
  FormLabel,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import api from '../lib/api';
import { FiSend } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteForever, MdShare } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ContentCard = ({ profilPic, id, username, likes, caption, image, location, comment, userId, createDate }) => {
  const [addComment, setAddComment] = useState(true);
  const [editCaption, setEditCaption] = useState(false);
  const [like, setLike] = useState(false);
  const authSelector = useSelector((state) => state.auth);

  const refreshPage = () => {
    window.location.reload();
  };
  const formik = useFormik({
    initialValues: {
      PostId: id,
      UserId: '',
      comment: '',
      caption: '',
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  const postCommentHandler = async () => {
    const dataComment = {
      PostId: formik.values.PostId,
      UserId: formik.values.UserId,
      comment: formik.values.comment,
    };
    await api.post(`/posts/${id}-comment`, dataComment);

    refreshPage();
  };

  const renderComment = () => {
    return comment.map((comment) => {
      return (
        <Flex alignItems="center" justify="space-between">
          <Text fontSize="sm">
            <span style={{ fontWeight: 'bold' }}>{comment.User?.username}</span>
            &nbsp;{comment.comment}
          </Text>
          <Text fontSize="xx-small">{moment(comment.createdAt).startOf('day').fromNow()}</Text>
        </Flex>
      );
    });
  };

  const deletePostHandler = async () => {
    await api.delete(`/posts/${id}`);
  };

  const likeStatus = async () => {
    const res = await api.get(`posts/${id}/like`);
    setLike(res.data.result);
  };

  const likePost = async () => {
    console.log(id);
    await api.patch(`posts/${id}/like`);
    setLike(!like);
    refreshPage();
  };

  const editPost = async () => {
    console.log(formik.values.caption);
    await api.patch(`posts/${id}/caption`, { caption: formik.values.caption });
    // refreshPage();
  };

  useEffect(() => {
    likeStatus();
  }, []);

  return (
    <Flex justify={'center'} mt={8}>
      <Stack w="sm" boxSizeing="sm" borderRadius="lg" padding={3} shadow="dark-lg">
        <Flex justifyContent="space-between" alignItems="center">
          <NextLink href={`/user/${userId}`}>
            <Flex cursor="pointer">
              <Avatar border="2px solid teal" name={username} src={profilPic} />
              <Box ms={3}>
                <Text fontWeight="medium">{username}</Text>
                <Text fontSize="sm" fontWeight="sm">
                  {location}
                </Text>
              </Box>
            </Flex>
          </NextLink>

          <Box>
            <Popover placement="bottom-end" size="xs">
              <PopoverTrigger>
                <Button bgColor="transparent">
                  <Icon boxSize={6} as={BsThreeDotsVertical} />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">Option</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Button
                    onClick={() => deletePostHandler()}
                    hidden={authSelector.id !== userId}
                    w="100%"
                    bgColor="transparent"
                    justifyContent="space-between"
                    //
                  >
                    <Text>Delete Post</Text>
                    <Icon as={MdDeleteForever} />
                  </Button>
                  <NextLink href={`/posts/${id}`}>
                    <Button w="100%" bgColor="transparent" justifyContent="space-between">
                      <Text>Share</Text>
                      <Icon as={MdShare} />
                    </Button>
                  </NextLink>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>

        <NextLink href={`/posts/${id}`}>
          <Image objectFit="cover" maxW="100%" src={image} />
        </NextLink>
        <Flex justify="space-between">
          <Box>
            <Icon
              boxSize={6}
              as={FaHeart}
              cursor="pointer"
              onClick={() => likePost()}
              color={!like ? 'gray.400' : 'red.400'}
              id={id}
              //
            />
            <Icon
              onClick={() => setAddComment(!addComment)}
              cursor="pointer"
              boxSize={6}
              ms={4}
              as={FaCommentAlt}
              color="gray.400"
              //
            />
          </Box>
          <Text fontSize="xs">{moment(createDate).format('Do MMMM YYYY')}</Text>
        </Flex>
        <Box>
          <Text fontWeight="medium" fontSize="small">
            {likes.toLocaleString()} Likes
          </Text>
          <Flex justify="space-between">
            <Text fontSize="sm">
              <span style={{ fontWeight: 'bold' }}>{username}</span>&nbsp;{caption}
            </Text>
            <Icon
              as={BiEditAlt}
              hidden={authSelector.id !== userId}
              onClick={() => setEditCaption(!editCaption)}
              //
            />
          </Flex>
          {editCaption ? (
            <InputGroup>
              <FormLabel htmlFor="caption"></FormLabel>
              <Input
                id="caption"
                placeholder="caption"
                name="caption"
                onChange={inputHandler}
                variant="flushed"
                //
              />

              <InputRightElement>
                <Icon
                  as={FiSend}
                  cursor="pointer"
                  onClick={() => editPost()}
                  //
                />
              </InputRightElement>
            </InputGroup>
          ) : (
            <></>
          )}
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
