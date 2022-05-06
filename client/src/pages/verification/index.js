import { Button, Center, Stack } from '@chakra-ui/react';

const VerificationPage = () => {
  return (
    <Center mt="50">
      <Stack>
        <h1>Congratulation, your account has been verified</h1>
        {/*  */}
        <Button colorScheme="green">
          <a href="http://localhost:3000/auth/login">Go to Login Page</a>
        </Button>
      </Stack>
    </Center>
  );
};

export default VerificationPage;
