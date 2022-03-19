// this file is Navbar Component layout

import { Avatar, Box, Button, Flex, HStack, MenuButton, MenuItem, MenuList, Text, Menu } from '@chakra-ui/react';
import jsCookie from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth_types } from '../redux/types';
import { useRouter } from 'next/router';

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const logoutBtnHandler = () => {
    dispatch({
      type: auth_types.LOGOUT_USER,
    });

    jsCookie.remove('user_data');
  };
  useEffect(() => {
    if (!authSelector.id) {
      router.push('/auth/login');
    }
  }, [authSelector]);

  return (
    <Flex h={20} bgColor="teal.400" alignItems="center">
      <HStack>
        <Menu>
          <MenuButton>
            <Avatar size="lg" ms={6} name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          </MenuButton>
          <MenuList>
            <MenuItem>My Profile</MenuItem>
            <MenuItem onClick={logoutBtnHandler}>Sign out</MenuItem>
          </MenuList>
        </Menu>
        <Box>
          <Text fontSize="lg">{authSelector.username}</Text>
          <Text fontWeight={'bold'}>{authSelector.fullName}</Text>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Navbar;
