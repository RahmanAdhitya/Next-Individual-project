// this file for login layout

import { Icon, FormControl, FormLabel, Stack, Input, Box, Container, Text, Button, Divider, HStack, Spacer, InputGroup, InputRightElement } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const loginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Container alignItems="center" centerContent py="10">
      <Box padding={4} width="md" shadow="dark-lg" borderRadius="xl">
        <Stack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" name="username" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel htmlfor="password">Password</FormLabel>
            <InputGroup>
              <Input id="password" name="password" type={passwordVisible ? 'text' : 'password'} />
              <InputRightElement children={<Icon onClick={() => setPasswordVisible(!passwordVisible)} as={passwordVisible ? IoMdEyeOff : IoMdEye} />} />
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue">Sign in</Button>
          <Button variant="link" colorScheme="blue" size="sm">
            Forgot password?
          </Button>
          <HStack>
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap">
              or
            </Text>
            <Divider />
          </HStack>
          <HStack>
            <Spacer />
            <Text color="muted">Don't have an account?</Text>
            <Text>
              <Link href={'./register'}>
                <Button variant="link" colorScheme="blue" size="sm">
                  Sign up
                </Button>
              </Link>
            </Text>
            <Spacer />
          </HStack>
        </Stack>
      </Box>
    </Container>
  );
};

export default loginPage;
