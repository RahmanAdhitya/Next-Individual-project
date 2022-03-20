import { Box, Button, Center, Divider, FormControl, FormLabel, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import axiosInstance from '../../lib/api';

const signupPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
    },
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      axiosInstance.post('/users', values);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };
  return (
    <Center padding={20}>
      <Box padding={8} width="lg" bgColor="gray.50" shadow="base" borderRadius="xl">
        <HStack>
          <Divider />
          <Text fontSize="lg" fontWeight="bold" whiteSpace="nowrap" color="">
            Create Your Account
          </Text>
          <Divider />
        </HStack>
        <Stack spacing={4}>
          <FormControl mt={4}>
            <FormLabel>Full Name</FormLabel>
            <Input onChange={inputHandler} name="fullName" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input onChange={inputHandler} name="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input onChange={inputHandler} name="username" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input onChange={inputHandler} name="password" />
          </FormControl>
          {/* <FormControl>
            <FormLabel>Repeat Password</FormLabel>
            <Input onChange={inputHandler} />
          </FormControl> */}
          <Button colorScheme="blue" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
            Sign up
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default signupPage;
