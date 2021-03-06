import { Button, Center, Stack, Text } from '@chakra-ui/react';
import jsCookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { auth_types } from '../../redux/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const VerificationPage = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    jsCookie.remove('user_data');
    jsCookie.remove('auth_token');

    dispatch({
      type: auth_types.LOGOUT_USER,
    });

    router.push('/auth/login');
  });
  return (
    <Center mt="50">
      <Stack>
        <h1>Congratulation, your account has been verified</h1>
        {/*  */}
        <Text>redirect to Login Page</Text>
      </Stack>
    </Center>
  );
};

export default VerificationPage;
