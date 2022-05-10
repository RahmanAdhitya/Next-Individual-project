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
  useDisclosure,
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
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useFetch from '../lib/hooks/usefetch';
import MoreComment from './moreComment';
import { post_types } from '../redux/types';

const ContentCard = ({ profilPic, id, username, likes, caption, image, location, userId, createDate, index }) => {
  const [addComment, setAddComment] = useState(true);
  const [editCaption, setEditCaption] = useState(false);
  const [like, setLike] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch([]);

  const authSelector = useSelector((state) => state.auth);
  const postSelector = useSelector((state) => state.post);

  const [data, count] = useFetch(`/posts/${id}/comment`, page, 5);

  const formik = useFormik({
    initialValues: {
      PostId: id,
      UserId: '',
      comment: '',
      caption: '',
    },
    validateOnChange: false,
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  const postCommentHandler = async () => {
    const dataComment = {
      PostId: formik.values.PostId,
      UserId: formik.values.UserId || authSelector.id,
      comment: formik.values.comment,
    };
    await api.post(`/posts/${id}-comment`, dataComment);
    refreshPage();
  };

  const renderComment = () => {
    return data?.map((comment) => {
      return (
        <Flex alignItems="center" justify="space-between">
          <Text fontSize="sm">
            <span style={{ fontWeight: 'bold' }}>{comment?.User?.username}</span>
            &nbsp;{comment?.comment}
          </Text>
          <Text fontSize="xx-small">{moment(comment?.createdAt).startOf('day').fromNow()}</Text>
        </Flex>
      );
    });
  };

  const deletePostHandler = async () => {
    await api.delete(`/posts/${id}`);

    dispatch({
      type: post_types.DELETE_POST,
      payload: index,
    });
  };

  const likeStatus = async () => {
    const res = await api.get(`posts/${id}/like-status`);
    setLike(res?.data?.result);
  };

  const likePost = async () => {
    const res = await api.patch(`posts/${id}/like`);
    console.log(`index ${index}`);

    const numberOfLike = postSelector.postList[index].like_count + 1;
    // numberOfLike += 1;

    const updateData = [index, { like_count: numberOfLike }];

    // console.log(`updateData ${updateData}`);
    dispatch({
      type: post_types.EDIT_POST,
      payload: updateData,
    });
    setLike(true);
  };
  const dislikePost = async () => {
    const res = await api.patch(`posts/${id}/dislike`);
    console.log(`index ${index}`);

    const numberOfLike = postSelector.postList[index].like_count - 1;
    // numberOfLike -= 1;

    const updateData = [index, { like_count: numberOfLike }];

    console.log(`updateData ${updateData}`);
    dispatch({
      type: post_types.EDIT_POST,
      payload: updateData,
    });
    setLike(false);
  };

  const editPost = async () => {
    await api.patch(`posts/${id}/caption`, { caption: formik.values.caption });

    const updateData = [index, { caption: formik.values.caption }];

    dispatch({
      type: post_types.EDIT_POST,
      payload: updateData,
    });

    setEditCaption(false);
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
            {like ? (
              <Icon
                boxSize={6}
                as={FaHeart}
                cursor="pointer"
                onClick={() => dislikePost()}
                color={'red.400'}
                id={id}
                //
              />
            ) : (
              <Icon
                boxSize={6}
                as={FaHeart}
                cursor="pointer"
                onClick={() => likePost()}
                color={'gray.400'}
                id={id}
                //
              />
            )}

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
            {likes?.toLocaleString()} Likes
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
        {/* <MoreComment id={id} /> */}
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
