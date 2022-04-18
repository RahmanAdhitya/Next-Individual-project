// this page for user profile

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

      console.log(selectedFile);
      // const data = {
      //   username: formik.values.username ? formik.values.username : authSelector.username,
      //   email: authSelector.email,
      //   full_name: authSelector.full_name,
      //   bio: formik.values.bio ? formik.values.bio : authSelector.bio,
      //   image_url: selectedFile ? selectedFile : authSelector.image_url,
      //   is_verified: false,
      // };

      const res = await api.get('auth');
      const data = res.data.result;
      const stringifyData = JSON.stringify(data);

      jsCookie.remove('user_data');
      jsCookie.set('user_data', stringifyData);

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
            <Heading mt={3} ms={2} lineHeight={1.1} fontSize={{ base: 'xl', sm: '2xl' }} justifyContent="space-between">
              User Profile
            </Heading>
            {edit ? (
              <Button size="xs" mt={3} me={2} onClick={() => setEdit(!edit)} colorScheme="orange">
                cancel
              </Button>
            ) : (
              <Button size="xs" mt={3} me={2} onClick={() => setEdit(!edit)} colorScheme="messenger">
                edit
              </Button>
            )}
          </Flex>
          <Flex mt={5} justify={'center'}>
            <Avatar size="xl" src={authSelector.image_url}></Avatar>
            <Input accept="image/png, image/jpeg" display="none" type="file" id="image_url" placeholder="Please enter domain" name="image_url" onChange={handelFile} ref={inputFileRef} />
          </Flex>
          <Flex mt={5} justify={'center'}>
            <Button size="xs" hidden={edit ? false : true} onClick={() => inputFileRef.current.click()} colorScheme="facebook">
              choose File
            </Button>
          </Flex>

          <Box boxSizing="sm" p={4}>
            <Stack>
              <FormControl>
                <FormLabel fontSize="xs">Username</FormLabel>
                <Input size="xs" fontSize="sm" id="username" name="username" defaultValue={authSelector.username} isDisabled={edit ? false : true} onChange={inputHandler} />

                <FormLabel mt={2} fontSize="xs">
                  Full Name
                </FormLabel>
                <Input size="xs" fontSize="sm" defaultValue={authSelector.full_name} isDisabled />

                <FormLabel fontSize="xs" mt={2}>
                  Email Address
                </FormLabel>
                <Input size="xs" fontSize="sm" defaultValue={authSelector.email} isDisabled />

                <FormLabel fontSize="xs" mt={2}>
                  Bio
                </FormLabel>
                <Textarea size="xs" fontSize="sm" id="bio" name="bio" defaultValue={authSelector.bio} isDisabled={edit ? false : true} onChange={inputHandler} />
              </FormControl>
            </Stack>
          </Box>

          <Flex justify={'end'}>
            <Button mb={3} me={3} size="sm" hidden={edit ? false : true} onClick={uploadContentHandler} colorScheme="facebook">
              Submit
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};

export default Profile;
