import { Box, Button, Center, Divider, FormControl, FormHelperText, FormLabel, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import axiosInstance from '../../lib/api';

const signupPage = () => {
  // const authSelector = useSelector((state) => state.auth);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('This field is required'),
      password: Yup.string()
        .required('This field is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),
      email: Yup.string().required('This field is required').email('invalid email exp'),
      full_name: Yup.string().required('This field is required'),
      repeatPassword: Yup.string().required('This field is required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);

      if (values.password === values.repeatPassword) {
        delete values.repeatPassword;

        axiosInstance.post('/auth/register', values);
        router.push('/auth/login');
      }
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  const inputHandlerRePassword = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Center padding={20}>
      <Box padding={8} width="md" bgColor="gray.50" shadow="base" borderRadius="xl">
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
            <Input onChange={inputHandler} name="full_name" />
            <FormHelperText>{formik.errors.full_name}</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input onChange={inputHandler} name="email" />
            <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input onChange={inputHandler} name="username" />
            <FormHelperText>{formik.errors.username}</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input onChange={inputHandler} name="password" />
            <FormHelperText>{formik.errors.password}</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Repeat Password</FormLabel>
            <Input name="repeatPassword" onChange={inputHandlerRePassword} />
            <FormHelperText>{formik.errors.repeatPassword}</FormHelperText>
          </FormControl>
          <Button colorScheme="blue" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
            Sign up
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default signupPage;
