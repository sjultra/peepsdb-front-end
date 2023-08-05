import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

import { Flex, Box, Text, Link } from '@chakra-ui/react';

const NotFoundScreen = () => {
  return (
    <Flex flexDirection="column" alignItems="center" m="3rem">
      <Text>
        <Box as="span" color="primary.500">
          Page{' '}
        </Box>
        Not Found
      </Text>
      <Text>
        <Link
          as={ReactLink}
          to="/"
          _hover={{ color: '#575555', transition: 'color 0.2s' }}
        >
          Click to return to home
        </Link>
      </Text>
    </Flex>
  );
};

export default NotFoundScreen;
