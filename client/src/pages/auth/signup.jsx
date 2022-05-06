// this file for login layout

import { Icon, FormControl, FormLabel, Stack, Input, Box, Container, Text, Button, InputGroup, InputRightElement, FormHelperText, useToast, Alert, AlertIcon } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import api from '../../lib/api';
import { signUp } from '../../redux/action/auth';

const signupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setrepeatPasswordVisible] = useState(false);

  const router = useRouter();
  const authSelector = useSelector((state) => state.auth);
  const toast = useToast();

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
      email: Yup.string().required('This field is required').email('invalid email'),
      full_name: Yup.string().required('This field is required'),
      repeatPassword: Yup.string().required('This field is required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      setTimeout(async () => {
        try {
          if (values.password != values.repeatPassword) {
            throw new Error('password not match');
          }
          await api.post('/auth/register', values);
          return (
            <Alert status="success">
              <AlertIcon />
              your account has been created, check your email for verifiy your new account
            </Alert>
          );
        } catch (err) {
          console.log(err);
          toast({
            title: 'error',
            description: err.message,
            status: 'error',
          });
        }

        // dispatch(signUp(values, formik.setSubmitting))
      }, 3000);
      formik.setSubmitting(false);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (authSelector.id) {
      router.push('/');
    }
  }, [authSelector.id]);
  return (
    <Container mt={8} alignItems="center" centerContent py="10">
      <Stack>
        <Box w="sm" shadow="2xl" p="8" borderRadius={10} borderColor="gray">
          <form>
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor="inputUsername">Username</FormLabel>
              <Input onChange={inputHandler} id="inputUsername" name="username" />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.email}>
              <FormLabel htmlFor="inputemail">email</FormLabel>
              <Input onChange={inputHandler} id="inputemail" name="email" />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.full_name}>
              <FormLabel htmlFor="inputfull_name">Full Name</FormLabel>
              <Input onChange={inputHandler} id="inputfull_name" name="full_name" />
              <FormHelperText>{formik.errors.full_name}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.password}>
              <FormLabel mt="4" htmlFor="inputPassword">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  id="inputPassword"
                  onChange={inputHandler}
                  name="password"
                  //
                />
                <InputRightElement
                  children={<Icon fontSize="xl" onClick={() => setPasswordVisible(!passwordVisible)} as={passwordVisible ? IoMdEyeOff : IoMdEye} sx={{ _hover: { cursor: 'pointer' } }} />}
                  //
                />
              </InputGroup>
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.repeatPassword}>
              <FormLabel mt="4" htmlFor="inputrepeatPassword">
                Repeat Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  id="inputrepeatPassword"
                  onChange={inputHandler}
                  repeatP
                  name="repeatPassword"
                  //
                />
                <InputRightElement
                  children={<Icon fontSize="xl" onClick={() => setrepeatPasswordVisible(!repeatPasswordVisible)} as={repeatPasswordVisible ? IoMdEyeOff : IoMdEye} sx={{ _hover: { cursor: 'pointer' } }} />}
                  //
                />
              </InputGroup>
              <FormHelperText>{formik.errors.repeatPassword}</FormHelperText>
            </FormControl>

            <Stack mt="10">
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                colorScheme="blue"
                disabled={formik.isSubmitting}
                //
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default signupPage;
