// this file for post new content
import { AddIcon } from '@chakra-ui/icons';
import { Icon, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, Textarea, useDisclosure, InputGroup, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../lib/api';
import { auth_types } from '../redux/types';

auth_types;
const PostContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef(null);
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      location: '',
      likes: 0,
      caption: '',
      UserId: '',
    },
    // validateOnChange: false,
    // onSubmit: (values) => {
    //   const newData = { ...values, UserId: authSelector.id };
    //   axiosInstance.post('/posts', newData);
    // },
  });
  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  const handelFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  // const choosenFile = () => {
  //   return selectedFile.map((val) => {
  //     return <Text>{}</Text>;
  //   });
  // };

  const uploadContentHandler = async () => {
    const formData = new FormData();
    const { caption, location } = formik.values;

    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('post_image_file', selectedFile);
    await axiosInstance.post('/posts', formData);

    router.push('/posts');
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Post
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Post New Content</DrawerHeader>

          <DrawerBody>
            <form>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="image">image</FormLabel>
                  <InputGroup>
                    <Input accept="image/png, image/jpeg" display="none" type="file" id="image_url" placeholder="Please enter domain" name="image_url" onChange={handelFile} ref={inputFileRef} />
                    <Button onClick={() => inputFileRef.current.click()} colorScheme="facebook">
                      choose File
                    </Button>
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Input id="location" placeholder="location" name="location" onChange={inputHandler} />
                </Box>

                <Box>
                  <FormLabel htmlFor="desc">caption</FormLabel>
                  <Textarea id="desc" name="caption" onChange={inputHandler} />
                </Box>
              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button onClose={onClose} colorScheme="blue" onClick={uploadContentHandler}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PostContent;
