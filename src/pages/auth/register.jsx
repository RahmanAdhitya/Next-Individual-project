import { Box, Button, Center, Divider, FormControl, FormLabel, HStack, Input, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const register = () => {
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
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Repeat Password</FormLabel>
            <Input />
          </FormControl>
          <Button colorScheme="blue">Sign up</Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default register;
