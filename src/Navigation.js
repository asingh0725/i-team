import React, { useContext} from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const NavBar = () => {
  // Use the AuthContext to get the current user
  const user = useContext(AuthContext);

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="1.25rem"
      backgroundColor="#c0c0c0"
      height="4.125rem" // Set a specific height for the navbar
    >
      <Flex alignItems="center">
        <Link to="/home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="img/header_logo.png" alt="Logo" style={{ height: '4.125rem', marginRight: '0.625rem' }} />
          <Text color="#fff" fontSize="1.5rem" fontWeight="bold">
            SHARE-A-BITE
          </Text>
        </Link>
      </Flex>
      <Flex direction="row" gap="1.25rem" style={{ fontSize: '1.25rem' }}>
        {/* If users get verified, they can access "Create Post" and "About";
            If users get inverified, they can't access Create Post, but "Home" and "About" */}
        {user && user.emailVerified ? (
          <>
            <Link to="/create-post" style={{ color: '#fff', textDecoration: 'none' }}>Create Post</Link>
            <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          </>
        ) : (
          <>
            <Link to="/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;