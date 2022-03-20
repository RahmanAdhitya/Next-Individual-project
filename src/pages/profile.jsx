// this page for user profile

import { SmallCloseIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, Box, Button, ButtonGroup, Center, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, InputGroup, InputRightElement, Stack, Text, useEditableControls } from '@chakra-ui/react';
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

  const editUsername = async () => {
    try {
      await axiosInstance.patch(`/users/${id}/username`);

      dispatch({
        type: auth_types.EDIT_USER,
        payload: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authSelector.id) {
      //   router.push('/auth/login');
    }
  }, [authSelector]);
  return (
    <Center mt={10}>
      <Box>
        <Stack>
          <Avatar size="xl" src="https://bit.ly/sage-adebayo">
            <AvatarBadge as={IconButton} size="sm" rounded="full" top="-10px" colorScheme="red" aria-label="remove Image" icon={<SmallCloseIcon />} />
          </Avatar>
          <Stack spacing={2}>
            <InputGroup>
              <Input variant="flushed" _active={edit ? true : false} defaultValue={authSelector.username} isDisabled={edit ? true : false} />
              <InputRightElement children={<Icon as={edit ? FiEdit : BsCheck2Square} onClick={() => setEdit(!edit)} sx={{ _hover: { cursor: 'pointer' } }} />} />
            </InputGroup>
            <Input variant="flushed" defaultValue={authSelector.fullName} />
            <Input variant="flushed" defaultValue={authSelector.email} />
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default Profile;
