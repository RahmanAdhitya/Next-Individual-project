// this page for user profile

import { SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Textarea,
  useEditableControls,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../lib/api';
import { Icon } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { BsCheck2Square } from 'react-icons/bs';

const Profile = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState();

  const formik = useFormik({});

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (!authSelector.id) {
      //   router.push('/auth/login');
    }
  }, [authSelector]);
  return (
    <Flex justify={'center'} mt={8}>
      <Box w="sm" justify={'center'} borderRadius={10} shadow="dark-lg">
        <Flex justifyContent="space-between">
          <Heading mt={5} ms={4} lineHeight={1.1} fontSize={{ base: 'xl', sm: '2xl' }} justifyContent="space-between">
            User Profile
          </Heading>
          <Button size="sm" onClick={() => setEdit(!edit)} mt={5} me={4}>
            Edit
          </Button>
        </Flex>
        <Flex mt={5} justify={'center'} spacing={2}>
          <Avatar size="xl" src={authSelector.image_url}></Avatar>
        </Flex>

        <Box p={6}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input name="username" defaultValue={authSelector.username} isDisabled={edit ? false : true} />

              <FormLabel mt={4}>Full Name</FormLabel>
              <Input defaultValue={authSelector.fullName} isDisabled />

              <FormLabel mt={4}>Email Address</FormLabel>
              <Input defaultValue={authSelector.email} isDisabled />

              <FormLabel mt={4}>Bio</FormLabel>
              <Textarea name="bio" defaultValue={authSelector.bio} isDisabled={edit ? false : true} />
            </FormControl>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Profile;
