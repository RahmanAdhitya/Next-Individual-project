// this file for post new content
import { AddIcon } from '@chakra-ui/icons';
import { Icon, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, Textarea, useDisclosure, InputGroup } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axiosInstance from '../lib/api';

const PostContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const authSelector = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      userId: authSelector.id,
      image: '',
      location: '',
      likes: 0,
      caption: '',
    },
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      axiosInstance.post('/posts', values);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
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
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input id="location" placeholder="location" name="location" onChange={inputHandler} />
              </Box>

              <Box>
                <FormLabel htmlFor="image">image</FormLabel>
                <InputGroup>
                  <Input type="url" id="image" placeholder="Please enter domain" name="image" onChange={inputHandler} />
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">caption</FormLabel>
                <Textarea id="desc" name="caption" onChange={inputHandler} />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={formik.handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PostContent;
