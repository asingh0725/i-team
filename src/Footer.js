import React from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';

const Footer = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="1.25rem"
      backgroundColor="#c0c0c0"
      justifyContent="center"
      style={{ textAlign: 'center', marginBottom: '0', marginTop: 'auto' }}
    >
      <Text fontSize="small" color="#333" style={{ margin: '0' }}>© 2023 Share-A-Bite All Rights Reserved.</Text>
      <Text fontSize="small" color="#333" style={{ margin: '0' }}>
        Created by Jennifer Morales, Mustafa Abdulkadir, Ryotaro Hayashi, Avi Singh
      </Text>
    </Flex>
  );
};

export default Footer;
