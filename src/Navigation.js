import React from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="20px"
      backgroundColor="#c0c0c0"
    >
      <Flex alignItems="center">
        <Link to="/home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="img/header_logo.png" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
          <Text color="#fff" fontSize="24px" fontWeight="bold">
            SHARE-A-BITE
          </Text>
        </Link>
      </Flex>
      <Flex direction="row" gap="20px" style={{ fontSize: 'larger' }}>
        <Link to="/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/create-post" style={{ color: '#fff', textDecoration: 'none' }}>Create Post</Link>
        <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
