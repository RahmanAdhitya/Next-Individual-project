// this page for user profile

import { SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../lib/api';
import { auth_types } from '../../redux/types';
import jsCookie from 'js-cookie';
import Navbar from '../../component/Navbar';

const Profile = () => {
  const authSelector = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState();

  const formik = useFormik({
    initialValues: {
      username: authSelector.username,
      email: authSelector.email,
      full_name: authSelector.full_name,
      bio: authSelector.bio,
      image_url: authSelector.image_url,
      is_verified: false,
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  const handelFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const uploadContentHandler = async () => {
    try {
      const formData = new FormData();
      const { username, bio, email, full_name } = formik.values;
      console.log(formik.values);
      formData.append('username', username);

      formData.append('bio', bio);
      formData.append('profile_image_file', selectedFile);

      await api.patch('/auth/profile', formData);

      const data = {
        username: formik.values.username ? formik.values.username : authSelector.username,
        email: authSelector.email,
        full_name: authSelector.full_name,
        bio: formik.values.bio ? formik.values.bio : authSelector.bio,
        image_url: formik.values.image_url ? formik.values.image_url : authSelector.image_url,
        is_verified: false,
      };
      jsCookie.remove('user_data');
      const stringifyData = JSON.stringify(data);
      jsCookie.set('user_data', stringifyData);
      console.log(data);

      dispatch({
        type: auth_types.EDIT_USER,
        payload: data,
      });

      setEdit(!edit);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // uploadContentHandler();
  }, [authSelector.username, authSelector.bio, authSelector.image_url]);
  return (
    <>
      <Navbar />
      <Flex boxSizing="sm" justify={'center'} mt={4}>
        <Stack borderRadius={10} shadow="dark-lg">
          <Flex justifyContent="space-between">
            <Heading mt={5} ms={4} lineHeight={1.1} fontSize={{ base: 'xl', sm: '2xl' }} justifyContent="space-between">
              User Profile
            </Heading>
            {edit ? (
              <Button size="sm" mt={5} me={4} onClick={() => setEdit(!edit)} colorScheme="orange">
                cancel
              </Button>
            ) : (
              <Button size="sm" mt={5} me={4} onClick={() => setEdit(!edit)} colorScheme="messenger">
                edit
              </Button>
            )}
          </Flex>
          <Flex mt={5} justify={'center'} spacing={2}>
            <Avatar size="xl" src={authSelector.image_url}></Avatar>
            <Input accept="image/png, image/jpeg" display="none" type="file" id="image_url" placeholder="Please enter domain" name="image_url" onChange={handelFile} ref={inputFileRef} />
          </Flex>
          <Flex mt={5} justify={'center'} spacing={2}>
            <Button size="sm" hidden={edit ? false : true} onClick={() => inputFileRef.current.click()} colorScheme="facebook">
              choose File
            </Button>
          </Flex>

          <Box p={6}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input id="username" name="username" defaultValue={authSelector.username} isDisabled={edit ? false : true} onChange={inputHandler} />

                <FormLabel mt={4}>Full Name</FormLabel>
                <Input defaultValue={authSelector.full_name} isDisabled />

                <FormLabel mt={4}>Email Address</FormLabel>
                <Input defaultValue={authSelector.email} isDisabled />

                <FormLabel mt={4}>Bio</FormLabel>
                <Textarea id="bio" name="bio" defaultValue={authSelector.bio} isDisabled={edit ? false : true} onChange={inputHandler} />
              </FormControl>
            </Stack>
          </Box>

          <Flex mb={5} me={5} justify={'end'} spacing={2}>
            <Button size="sm" hidden={edit ? false : true} onClick={uploadContentHandler} colorScheme="facebook">
              Submit
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};

export default Profile;
